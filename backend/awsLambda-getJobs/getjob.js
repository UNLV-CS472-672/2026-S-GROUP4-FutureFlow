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
    new GetSecretValueCommand({
      SecretId: secretArn
    })
  );

  if (!result.SecretString) {
    throw new Error("SecretString is empty");
  }

  const parsed = JSON.parse(result.SecretString);

  cachedSecret = {
    username: parsed.username,
    password: parsed.password
  };

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
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  return pool;
}

exports.handler = async function (event) {
  let conn;

  // Check the incoming origin against the allowlist
  const requestOrigin = event.headers?.origin || event.headers?.Origin || "";
  const allowedOrigin = ALLOWED_ORIGINS.has(requestOrigin)
    ? requestOrigin
    : "https://d2akntkunvhs1k.cloudfront.net"; // fallback to production

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
  };

  try {
    console.log("Lambda started");

    const db = await getPool();
    conn = await db.getConnection();
    // await conn.query("FLUSH HOSTS");

    console.log("Connected to MariaDB");

    const rows = await conn.query(`
      SELECT
        job_title,
        job_id,
        company,
        job_location,
        job_type,
        duration,
        pay,
        link,
        job_description,
        extracted_skills,
        pay_period
      FROM job_info
      ORDER BY job_id DESC
      LIMIT 50
    `);

    console.log("Query successful");

    return {
      "statusCode": 200,
      "headers": corsHeaders,
      "body": JSON.stringify(rows)
    };
  } catch (error) {
    console.error("Lambda error:", error);

    return {
      statusCode: 500,
      "headers": corsHeaders,
      body: JSON.stringify({
        message: "Failed to fetch jobs",
        error: error.message || String(error)
      })
    };
  } finally {
    if (conn) conn.end();
  }
};
