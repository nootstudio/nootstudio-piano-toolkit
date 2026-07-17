const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, authorization",
    "access-control-allow-methods": "POST, OPTIONS"
  },
  body: JSON.stringify(body)
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
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

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeCode(code) {
  return String(code || "").trim().toUpperCase().replace(/\s+/g, "");
}

function isExpired(value) {
  return value && new Date(value).getTime() < Date.now();
}

async function findProfileByEmail(email) {
  const rows = await supabaseFetch(`/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=user_id`);
  return rows[0] || null;
}

async function resolveProductId(accessCode) {
  if (accessCode.product_id) return accessCode.product_id;
  const configuredProductId = process.env.SHOPIFY_PRODUCT_ID;
  let query = "/rest/v1/products?select=id&active=eq.true&limit=1";
  if (configuredProductId) {
    query = `/rest/v1/products?shopify_product_id=eq.${encodeURIComponent(configuredProductId)}&select=id&limit=1`;
  }
  const rows = await supabaseFetch(query);
  if (!rows[0]?.id) throw new Error("No product available for access code");
  return rows[0].id;
}

async function findAccessCode(code) {
  const rows = await supabaseFetch(
    `/rest/v1/access_codes?code=eq.${encodeURIComponent(code)}&select=id,code,label,product_id,max_uses,expires_at,active`
  );
  return rows[0] || null;
}

async function existingRedemption(accessCodeId, email) {
  const rows = await supabaseFetch(
    `/rest/v1/access_code_redemptions?access_code_id=eq.${encodeURIComponent(accessCodeId)}&email=eq.${encodeURIComponent(email)}&select=id,entitlement_id`
  );
  return rows[0] || null;
}

async function redemptionCount(accessCodeId) {
  const response = await fetch(supabaseUrl(`/rest/v1/access_code_redemptions?access_code_id=eq.${encodeURIComponent(accessCodeId)}&select=id`), {
    method: "HEAD",
    headers: supabaseHeaders({ Prefer: "count=exact" })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase ${response.status}: ${text}`);
  }
  const range = response.headers.get("content-range") || "";
  const count = range.split("/")[1];
  return Number(count || 0);
}

async function upsertAccessEntitlement({ accessCode, email, profile }) {
  const productId = await resolveProductId(accessCode);
  const rows = await supabaseFetch("/rest/v1/entitlements?on_conflict=source,source_order_id,product_id", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      user_id: profile?.user_id || null,
      product_id: productId,
      customer_email: email,
      source: "access_code",
      source_order_id: `access-code:${accessCode.id}:${email}`,
      source_line_item_id: null,
      starts_at: new Date().toISOString(),
      expires_at: accessCode.expires_at || null,
      revoked_at: null,
      metadata: {
        access_code_id: accessCode.id,
        access_code_label: accessCode.label || "",
        access_code: accessCode.code
      }
    })
  });
  return rows[0];
}

async function upsertRedemption({ accessCode, email, profile, entitlement, alreadyClaimed }) {
  const rows = await supabaseFetch("/rest/v1/access_code_redemptions?on_conflict=access_code_id,email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      access_code_id: accessCode.id,
      email,
      user_id: profile?.user_id || null,
      entitlement_id: entitlement.id,
      last_seen_at: profile?.user_id ? new Date().toISOString() : null,
      metadata: {
        already_claimed: Boolean(alreadyClaimed)
      }
    })
  });
  return rows[0];
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const body = JSON.parse(event.body || "{}");
    const email = normalizeEmail(body.email);
    const code = normalizeCode(body.code);
    if (!email || !email.includes("@")) return json(400, { error: "Vul een geldig e-mailadres in." });
    if (!code) return json(400, { error: "Vul een klascode in." });

    const accessCode = await findAccessCode(code);
    if (!accessCode || !accessCode.active) return json(404, { error: "Deze klascode is niet gevonden." });

    const existing = await existingRedemption(accessCode.id, email);
    if (!existing && isExpired(accessCode.expires_at)) {
      return json(403, { error: "Deze klascode is verlopen." });
    }

    if (!existing && accessCode.max_uses) {
      const used = await redemptionCount(accessCode.id);
      if (used >= Number(accessCode.max_uses)) {
        return json(403, { error: "Deze klascode is vol." });
      }
    }

    const profile = await findProfileByEmail(email);
    const entitlement = await upsertAccessEntitlement({ accessCode, email, profile });
    await upsertRedemption({ accessCode, email, profile, entitlement, alreadyClaimed: Boolean(existing) });

    return json(200, {
      ok: true,
      email,
      code: accessCode.code,
      label: accessCode.label,
      expiresAt: accessCode.expires_at,
      alreadyClaimed: Boolean(existing)
    });
  } catch (error) {
    console.error("claim-access-code failed", { message: error.message });
    return json(500, { error: "De klascode kon niet verwerkt worden. Probeer het opnieuw." });
  }
};
