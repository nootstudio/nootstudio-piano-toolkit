const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, authorization",
    "access-control-allow-methods": "GET, POST, OPTIONS"
  },
  body: JSON.stringify(body)
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function supabaseBaseUrl() {
  return requiredEnv("SUPABASE_URL").replace(/\/+$/, "");
}

function serviceRoleKey() {
  return requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
}

function supabaseHeaders(extra = {}) {
  const key = serviceRoleKey();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...extra
  };
}

async function supabaseFetch(path, options = {}) {
  const response = await fetch(`${supabaseBaseUrl()}${path}`, {
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

function bearerToken(event) {
  const header = event.headers.authorization || event.headers.Authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function authUserFromBearer(event) {
  const token = bearerToken(event);
  if (!token) return null;
  const response = await fetch(`${supabaseBaseUrl()}/auth/v1/user`, {
    headers: {
      apikey: serviceRoleKey(),
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) return null;
  return response.json();
}

async function requireAdmin(event) {
  const user = await authUserFromBearer(event);
  if (!user?.id) return null;
  const rows = await supabaseFetch(
    `/rest/v1/profiles?user_id=eq.${encodeURIComponent(user.id)}&select=user_id,email,role&limit=1`
  );
  const profile = rows[0];
  if (profile?.role !== "admin") return null;
  return { user, profile };
}

function normalizeCode(code) {
  return String(code || "").trim().toUpperCase().replace(/\s+/g, "");
}

function toIsoEndOfDay(dateValue) {
  if (!dateValue) return "";
  if (String(dateValue).includes("T")) return new Date(dateValue).toISOString();
  return new Date(`${dateValue}T23:59:59.999`).toISOString();
}

async function resolveProductId() {
  const configuredProductId = process.env.SHOPIFY_PRODUCT_ID;
  let query = "/rest/v1/products?select=id&active=eq.true&limit=1";
  if (configuredProductId) {
    query = `/rest/v1/products?shopify_product_id=eq.${encodeURIComponent(configuredProductId)}&select=id&limit=1`;
  }
  const rows = await supabaseFetch(query);
  if (!rows[0]?.id) throw new Error("No product available for access code");
  return rows[0].id;
}

async function listAccessCodes() {
  const [codes, redemptions] = await Promise.all([
    supabaseFetch("/rest/v1/access_codes?select=*&order=created_at.desc"),
    supabaseFetch("/rest/v1/access_code_redemptions?select=*&order=claimed_at.desc")
  ]);
  const redemptionsByCode = new Map();
  redemptions.forEach((redemption) => {
    const list = redemptionsByCode.get(redemption.access_code_id) || [];
    list.push(redemption);
    redemptionsByCode.set(redemption.access_code_id, list);
  });
  return codes.map((code) => {
    const codeRedemptions = redemptionsByCode.get(code.id) || [];
    return {
      ...code,
      usedCount: codeRedemptions.length,
      redemptions: codeRedemptions
    };
  });
}

async function createAccessCode(body, admin) {
  const code = normalizeCode(body.code);
  const label = String(body.label || "").trim() || code;
  const expiresAt = toIsoEndOfDay(body.expiresAt);
  const maxUses = body.maxUses === "" || body.maxUses === null || body.maxUses === undefined
    ? null
    : Number(body.maxUses);

  if (code.length < 3) throw new Error("Gebruik minimaal 3 tekens voor de klascode.");
  if (!expiresAt || Number.isNaN(Date.parse(expiresAt))) throw new Error("Kies een geldige einddatum.");
  if (maxUses !== null && (!Number.isFinite(maxUses) || maxUses < 1)) {
    throw new Error("Max leerlingen moet leeg zijn of minimaal 1.");
  }

  const productId = body.productId || await resolveProductId();
  const rows = await supabaseFetch("/rest/v1/access_codes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      code,
      label,
      product_id: productId,
      max_uses: maxUses,
      expires_at: expiresAt,
      active: true,
      created_by: admin.user.id
    })
  });
  return rows[0];
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (!["GET", "POST"].includes(event.httpMethod)) return json(405, { error: "Method not allowed" });

  try {
    const admin = await requireAdmin(event);
    if (!admin) return json(403, { error: "Alleen beheerders kunnen toegangscodes beheren." });

    if (event.httpMethod === "GET") {
      return json(200, { codes: await listAccessCodes() });
    }

    const created = await createAccessCode(JSON.parse(event.body || "{}"), admin);
    return json(201, { code: created });
  } catch (error) {
    console.error("admin-access-codes failed", { message: error.message });
    return json(400, { error: error.message || "Toegangscode kon niet verwerkt worden." });
  }
};
