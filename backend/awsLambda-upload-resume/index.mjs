// Imports
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET_NAME = process.env.UPLOAD_BUCKET_NAME;

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
  "Content-Type": "application/json",
};

export const handler = async (event) => {
  console.log("METHOD:", event.requestContext?.http?.method);
  console.log("PATH:", event.rawPath);

  if (
    event.requestContext?.http?.method === "OPTIONS" ||
    event.httpMethod === "OPTIONS"
  ) {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  try {
    const body =
      typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || {};

    const fileName = body.fileName;
    const contentType = body.contentType || body.fileType;

    if (!fileName || !contentType) {
      return response(400, { error: "fileName and contentType are required" });
    }

    if (contentType !== "application/pdf") {
      return response(400, { error: "Only PDF uploads are allowed" });
    }

    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `uploads/${randomUUID()}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    return response(200, {
      uploadUrl,
      key,
    });
  } catch (err) {
    console.error("Error:", err);
    return response(500, { error: "Failed to generate upload URL" });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}