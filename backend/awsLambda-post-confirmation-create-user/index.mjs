import * as mariadb from "mariadb";
import {
  SecretsManagerClient,
  GetSecretValueCommand
} from "@aws-sdk/client-secrets-manager";

const secretsClient = new SecretsManagerClient({});

let pool;

async function getDbSecret() {
  const response = await secretsClient.send(
    new GetSecretValueCommand({
      SecretId: process.env.DB_SECRET_ARN
    })
  );

  return JSON.parse(response.SecretString);
}

async function getPool() {
  if (pool) return pool;

  const secret = await getDbSecret();

  pool = mariadb.createPool({
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

  return pool;
}

export const handler = async (event) => {
  let conn;

  try {
    console.log("1. Post confirmation fired");

    const sub = event.request.userAttributes.sub;
    const email = event.request.userAttributes.email;

    console.log("2. Got sub:", sub);
    console.log("3. Got email:", email);

    const dbPool = await getPool();

    console.log("4. Connecting to DB...");
    conn = await dbPool.getConnection();

    console.log("5. Connected to DB");

    await conn.query(
      `
      INSERT IGNORE INTO user_info (cognito_sub, email)
      VALUES (?, ?)
      `,
      [sub, email]
    );

    console.log("6. User inserted successfully");

    return event;
  } catch (err) {
    console.error("Post confirmation error:", err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};