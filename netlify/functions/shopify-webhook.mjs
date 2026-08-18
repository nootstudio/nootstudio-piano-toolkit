import { createHash, createHmac, timingSafeEqual } from "node:crypto";

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}

function requiredEnv(name) {
  const value = Netlify.env.get(name);
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function optionalEnv(name) {
  return Netlify.env.get(name) || "";
}

function verifyShopifyHmac(rawBody, receivedHmac, secret) {
  if (!receivedHmac) return false;
  const digest = createHmac("sha256", secret).update(rawBody).digest("base64");
  const expected = Buffer.from(digest, "utf8");
  const actual = Buffer.from(receivedHmac, "utf8");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function supabaseHeaders(extra = {}) {
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    ...extra
  };
}

function supabaseUrl(path) {
  return `${requiredEnv("SUPABASE_URL").replace(/\/+$/, "")}${path}`;
}

async function supabaseFetch(path, options = {}) {
  const response = await fetch(supabaseUrl(path), {
    ...options,
    headers: supabaseHeaders(options.headers || {})
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${text}`);
  if (!text.trim()) return null;
  return JSON.parse(text);
}

async function existingWebhookEvent(webhookId) {
  const rows = await supabaseFetch(
    `/rest/v1/shopify_webhook_events?shopify_webhook_id=eq.${encodeURIComponent(webhookId)}&select=id,status`
  );
  return rows[0] || null;
}

async function insertWebhookEvent({ webhookId, topic, shopDomain, payload }) {
  const rows = await supabaseFetch("/rest/v1/shopify_webhook_events", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      shopify_webhook_id: webhookId,
      topic,
      shop_domain: shopDomain,
      payload
    })
  });
  return rows[0];
}

async function markWebhookEvent(id, status, error = null) {
  await supabaseFetch(`/rest/v1/shopify_webhook_events?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      status,
      error,
      processed_at: new Date().toISOString()
    })
  });
}

function orderEmail(order) {
  return order.email || order.contact_email || order.customer?.email || "";
}

function matchingLineItem(order) {
  const configuredProductId = optionalEnv("SHOPIFY_PRODUCT_ID");
  const lineItems = Array.isArray(order.line_items) ? order.line_items : [];
  if (!configuredProductId) return lineItems[0] || null;
  return lineItems.find((item) => String(item.product_id) === String(configuredProductId)) || null;
}

function purchaseEmailRedirectUrl() {
  const configuredUrl = optionalEnv("APP_URL") || optionalEnv("URL");
  if (!configuredUrl) throw new Error("Missing APP_URL or URL");
  const url = new URL(configuredUrl);
  url.hash = "";
  url.search = "";
  return url.href;
}

async function sendPurchaseAccessEmail({ email, order }) {
  const redirectTo = purchaseEmailRedirectUrl();
  await supabaseFetch(`/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email,
      create_user: true,
      data: {
        purchase_source: "shopify",
        shopify_order_id: String(order.id)
      }
    })
  });
}

async function upsertProduct(lineItem) {
  const rows = await supabaseFetch("/rest/v1/products?on_conflict=shopify_product_id", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      shopify_product_id: String(lineItem.product_id || ""),
      name: lineItem.title || "Nootstudio Akkoorden",
      active: true
    })
  });
  return rows[0];
}

async function findProfileByEmail(email) {
  const rows = await supabaseFetch(
    `/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=user_id`
  );
  return rows[0] || null;
}

async function upsertEntitlement({ order, lineItem, product, email }) {
  const profile = await findProfileByEmail(email);
  const rows = await supabaseFetch(
    "/rest/v1/entitlements?on_conflict=source,source_order_id,product_id",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation"
      },
      body: JSON.stringify({
        user_id: profile?.user_id || null,
        product_id: product.id,
        customer_email: email,
        source: "shopify",
        source_order_id: String(order.id),
        source_line_item_id: lineItem.id ? String(lineItem.id) : null,
        starts_at: new Date().toISOString(),
        expires_at: null,
        revoked_at: null,
        metadata: {
          order_name: order.name || "",
          order_number: order.order_number || "",
          product_id: lineItem.product_id || "",
          variant_id: lineItem.variant_id || ""
        }
      })
    }
  );
  return rows[0];
}

async function upsertShopifyOrder({ order, product, entitlement, email }) {
  await supabaseFetch("/rest/v1/shopify_orders?on_conflict=shopify_order_id", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify({
      shopify_order_id: String(order.id),
      customer_email: email,
      product_id: product.id,
      entitlement_id: entitlement.id,
      payload: order
    })
  });
}

async function processPaidOrder(order) {
  const lineItem = matchingLineItem(order);
  if (!lineItem) return { status: "ignored", reason: "No matching product" };

  const email = orderEmail(order).trim().toLowerCase();
  if (!email) throw new Error("Order has no customer email");

  const product = await upsertProduct(lineItem);
  const entitlement = await upsertEntitlement({ order, lineItem, product, email });
  await upsertShopifyOrder({ order, product, entitlement, email });
  await sendPurchaseAccessEmail({ email, order });
  return { status: "processed", entitlementId: entitlement.id, accessEmailSent: true };
}

export default async (request) => {
  if (request.method !== "POST") {
    console.log("shopify-webhook rejected non-POST request", { method: request.method });
    return json(405, { error: "Method not allowed" });
  }

  const rawBody = Buffer.from(await request.arrayBuffer());
  const hmac = request.headers.get("x-shopify-hmac-sha256") || "";
  const topic = request.headers.get("x-shopify-topic") || "";
  const shopDomain = request.headers.get("x-shopify-shop-domain") || "";
  const webhookId = request.headers.get("x-shopify-webhook-id")
    || createHash("sha256").update(rawBody).digest("hex");

  console.log("shopify-webhook received", {
    topic: topic || "missing",
    shopDomain: shopDomain || "missing",
    webhookId,
    hasHmac: Boolean(hmac),
    bodyBytes: rawBody.length
  });

  if (!verifyShopifyHmac(rawBody, hmac, requiredEnv("SHOPIFY_WEBHOOK_SECRET"))) {
    console.warn("shopify-webhook invalid hmac", { topic, shopDomain, webhookId });
    return json(401, { error: "Invalid HMAC" });
  }

  const existing = await existingWebhookEvent(webhookId);
  if (existing?.status === "processed" || existing?.status === "ignored") {
    return json(200, { ok: true, duplicate: true });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const eventRow = existing || await insertWebhookEvent({ webhookId, topic, shopDomain, payload });

  try {
    if (topic !== "orders/paid") {
      await markWebhookEvent(eventRow.id, "ignored");
      return json(200, { ok: true, ignored: topic || "unknown topic" });
    }

    const result = await processPaidOrder(payload);
    await markWebhookEvent(eventRow.id, result.status);
    console.log("shopify-webhook completed", { webhookId, ...result });
    return json(200, { ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await markWebhookEvent(eventRow.id, "failed", message);
    } catch (markError) {
      console.error("shopify-webhook could not store failure", {
        webhookId,
        message: markError instanceof Error ? markError.message : String(markError)
      });
    }
    console.error("shopify-webhook failed", { webhookId, message });
    return json(500, { error: "Webhook processing failed" });
  }
};
