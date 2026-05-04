const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { CognitoJwtVerifier } = require("aws-jwt-verify");

const secretsClient = new SecretsManagerClient({});

const ALLOWED_ORIGINS = new Set([
  "https://d2akntkunvhs1k.cloudfront.net",
  "http://localhost:5173",
]);

// Verifies the idToken (contains sub, email, name)
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_APP_CLIENT_ID,
});

let pool = null;
let cachedSecret = null;
let mariadb = null;

async function getMariadb() {
  if (!mariadb) {
    const mod = await import("mariadb");
    mariadb = mod.default || mod;
  }
  return mariadb;
}

async function getDbSecret() {
  if (cachedSecret) return cachedSecret;

  const secretArn = process.env.DB_SECRET_ARN;
  if (!secretArn) throw new Error("Missing DB_SECRET_ARN");

  const result = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: secretArn })
  );

  if (!result.SecretString) throw new Error("SecretString is empty");

  const parsed = JSON.parse(result.SecretString);
  cachedSecret = { username: parsed.username, password: parsed.password };
  return cachedSecret;
}

async function getPool() {
  if (!pool) {
    const secret = await getDbSecret();
    const mariadbLib = await getMariadb();

    pool = mariadbLib.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: secret.username,
      password: secret.password,
      database: process.env.DB_NAME,
      connectionLimit: 5,
      ssl: { rejectUnauthorized: false },
    });
  }

  return pool;
}

exports.handler = async function (event) {
  let conn;

  const requestOrigin = event.headers?.origin || event.headers?.Origin || "";
  const allowedOrigin = ALLOWED_ORIGINS.has(requestOrigin)
    ? requestOrigin
    : "https://d2akntkunvhs1k.cloudfront.net";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  };

  // Handle CORS preflight
  const httpMethod = event.httpMethod || event.requestContext?.http?.method || "";
  if (httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  try {
    console.log("Lambda started");

    // ── 1. Verify JWT and extract sub ──────────────────────────────────────
    const cognito_sub = event.requestContext?.authorizer?.jwt?.claims?.sub;

    if (!cognito_sub) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    // ── 2. Parse and validate request body ────────────────────────────────
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Invalid JSON body" }),
      };
    }

    const { job_id, action } = body;

    if (!job_id || !action) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Missing required fields: job_id, action" }),
      };
    }

    if (!["save", "unsave", "apply"].includes(action)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Invalid action. Must be: save, unsave, or apply" }),
      };
    }

    // ── 3. Database operations ─────────────────────────────────────────────
    const db = await getPool();
    conn = await db.getConnection();

    console.log("Connected to MariaDB");

    const rows = await conn.query(
      "SELECT saved_jobs, applied_jobs FROM user_info WHERE cognito_sub = ?",
      [cognito_sub]
    );

    if (rows.length === 0) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    let saved = rows[0].saved_jobs;
    let applied = rows[0].applied_jobs;
    
    if (typeof saved === 'string') saved = JSON.parse(saved || "[]");
    if (typeof applied === 'string') applied = JSON.parse(applied || "[]");
    
    if (!Array.isArray(saved)) saved = [];
    if (!Array.isArray(applied)) applied = [];

    if (action === "save") {
      if (!saved.includes(job_id)) saved.push(job_id);
      await conn.query(
        "UPDATE user_info SET saved_jobs = ? WHERE cognito_sub = ?",
        [JSON.stringify(saved), cognito_sub]
      );

    } else if (action === "unsave") {
      saved = saved.filter((id) => id !== job_id);
      await conn.query(
        "UPDATE user_info SET saved_jobs = ? WHERE cognito_sub = ?",
        [JSON.stringify(saved), cognito_sub]
      );

    } else if (action === "apply") {
      if (!applied.includes(job_id)) applied.push(job_id);
      saved = saved.filter((id) => id !== job_id);
      await conn.query(
        "UPDATE user_info SET applied_jobs = ?, saved_jobs = ? WHERE cognito_sub = ?",
        [JSON.stringify(applied), JSON.stringify(saved), cognito_sub]
      );
    }

    console.log(`Action '${action}' successful for job_id ${job_id}`);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        saved_jobs: saved,
        applied_jobs: applied,
      }),
    };

  } catch (error) {
    console.error("Lambda error:", error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Failed to update job status",
        error: error.message || String(error),
      }),
    };
  } finally {
    if (conn) conn.end();
  }
};