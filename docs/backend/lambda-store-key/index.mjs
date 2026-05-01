import mysql from "mysql2/promise";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_REGION,
});

let cachedDbConfig = null;

async function getDbCredentials() {
  if (cachedDbConfig) return cachedDbConfig;

  const secretName = process.env.DB_SECRET_ARN;
  if (!secretName) {
    throw new Error("Missing DB_SECRET_ARN environment variable");
  }

  const response = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: secretName })
  );

  if (!response.SecretString) {
    throw new Error("SecretString is empty or missing");
  }

  const secret = JSON.parse(response.SecretString);

  cachedDbConfig = {
    host: secret.host,
    port: Number(secret.port || 3306),
    user: secret.username,
    password: secret.password,
    database: "futureflow",
  };

  return cachedDbConfig;
}


export const handler = async (event) => {
  let connection;

  try {
    const body =
      typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || {};

    const { fileKey } = body;

    if (!fileKey) {
      return makeResponse(400, {
        message: "fileKey is required",
      });
    }

    const cognitoSub = event.requestContext?.authorizer?.jwt?.claims?.sub;

    if (!cognitoSub) {
      return makeResponse(401, {
        message: "Unauthorized",
      });
    }

    const dbConfig = await getDbCredentials();

    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,

      ssl:{
        rejectUnauthorized: false
      }
    });

    const [result] = await connection.execute(
     `
      UPDATE user_info
      SET user_resume = ?
      WHERE cognito_sub = ?
      `,
      [fileKey, cognitoSub]
    );

    if (result.affectedRows === 0) {
      return makeResponse(404, { message: "User not found" });
    }

    return makeResponse(200, {
      message: "Key stored successfully",
      cognitoSub,
      fileKey,
    });
  } catch (error) {
    console.error("Error storing key:", error);
    return makeResponse(500, {
      message: "Internal server error",
      error: error.message,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

function makeResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}