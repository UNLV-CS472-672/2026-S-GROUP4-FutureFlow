const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secretsClient = new SecretsManagerClient({});

const ALLOWED_ORIGINS = new Set([
  "https://d2akntkunvhs1k.cloudfront.net",
  "http://localhost:5173",
]);

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
    "Access-Control-Allow-Methods": "GET,OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  try {
    console.log("Lambda started");

    const cognito_sub = event.queryStringParameters?.cognito_sub;

    if (!cognito_sub) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: "Missing required parameter: cognito_sub" }),
      };
    }

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

    let saved_jobs = rows[0].saved_jobs;
    let applied_jobs = rows[0].applied_jobs;
    
    if (typeof saved_jobs === 'string') saved_jobs = JSON.parse(saved_jobs || "[]");
    if (typeof applied_jobs === 'string') applied_jobs = JSON.parse(applied_jobs || "[]");
    
    if (!Array.isArray(saved_jobs)) saved_jobs = [];
    if (!Array.isArray(applied_jobs)) applied_jobs = [];

    console.log("Query successful");

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ saved_jobs, applied_jobs }),
    };

  } catch (error) {
    console.error("Lambda error:", error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Failed to fetch user jobs",
        error: error.message || String(error),
      }),
    };
  } finally {
    if (conn) conn.end();
  }
};