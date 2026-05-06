const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secretsClient = new SecretsManagerClient({});

exports.handler = async function() {
  const result = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ARN })
  );
  const { username, password } = JSON.parse(result.SecretString);

  const mod = await import("mariadb");
  const mariadb = mod.default || mod;

  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: username,
    password: password,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  const rows = await conn.query("SELECT * FROM job_info LIMIT 10");
  await conn.end();

  return rows;
};