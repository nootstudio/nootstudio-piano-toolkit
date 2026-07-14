const crypto = require("crypto");

const json = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body)
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function rawRequestBody(event) {
  return Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8");
}

function verifyShopifyHmac(rawBody, receivedHmac, secret) {
  if (!receivedHmac) return false;
  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");
  const expected = Buffer.from(digest, "utf8");
  const actual = Buffer.from(receivedHmac, "utf8");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
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
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase ${response.status}: ${text}`);
  }
  if (response.status === 204) return null;
  return response.json();
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
  const configuredProductId = process.env.SHOPIFY_PRODUCT_ID;
  const lineItems = Array.isArray(order.line_items) ? order.line_items : [];
  if (!configuredProductId) return lineItems[0] || null;
  return lineItems.find((item) => String(item.product_id) === String(configuredProductId)) || null;
}

async function upsertProduct(lineItem) {
  const shopifyProductId = String(lineItem.product_id || "");
  const rows = await supabaseFetch("/rest/v1/products?on_conflict=shopify_product_id", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      shopify_product_id: shopifyProductId,
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
  const rows = await supabaseFetch("/rest/v1/entitlements?on_conflict=source,source_order_id,product_id", {
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
  });
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
  return { status: "processed", entitlementId: entitlement.id };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const rawBody = rawRequestBody(event);
  const headers = event.headers || {};
  const hmac = headers["x-shopify-hmac-sha256"] || headers["X-Shopify-Hmac-Sha256"];
  const topic = headers["x-shopify-topic"] || headers["X-Shopify-Topic"] || "";
  const shopDomain = headers["x-shopify-shop-domain"] || headers["X-Shopify-Shop-Domain"] || "";
  const webhookId = headers["x-shopify-webhook-id"] || headers["X-Shopify-Webhook-Id"]
    || crypto.createHash("sha256").update(rawBody).digest("hex");

  if (!verifyShopifyHmac(rawBody, hmac, requiredEnv("SHOPIFY_WEBHOOK_SECRET"))) {
    return json(401, { error: "Invalid HMAC" });
  }

  const existing = await existingWebhookEvent(webhookId);
  if (existing?.status === "processed" || existing?.status === "ignored") {
    return json(200, { ok: true, duplicate: true });
  }

  const payload = JSON.parse(rawBody.toString("utf8"));
  const eventRow = existing || await insertWebhookEvent({ webhookId, topic, shopDomain, payload });

  try {
    if (topic !== "orders/paid") {
      await markWebhookEvent(eventRow.id, "ignored");
      return json(200, { ok: true, ignored: topic || "unknown topic" });
    }

    const result = await processPaidOrder(payload);
    await markWebhookEvent(eventRow.id, result.status);
    return json(200, { ok: true, ...result });
  } catch (error) {
    await markWebhookEvent(eventRow.id, "failed", error.message);
    return json(500, { error: "Webhook processing failed" });
  }
};
