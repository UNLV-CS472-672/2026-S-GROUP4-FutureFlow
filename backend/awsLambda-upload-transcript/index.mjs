//Imports
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

//Variables to hold the s3 Client and the s3 Bucket name
const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET_NAME = process.env.UPLOAD_BUCKET_NAME;

export const handler = async (event) => {
  try {
    //Look at the request body
    const body =
    typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body || {};
    const { fileName, contentType } = body;

    //Input validation
    if (!fileName || !contentType) {
      return response(400, { error: "fileName and contentType are required" });
    }

    //Check if the input is a pdf, else throw an error
    if (contentType !== "application/pdf") {
      return response(400, { error: "Only PDF uploads are allowed" });
    }

    //Normalize filename and create key
    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `uploads/${randomUUID()}-${safeFileName}`;

    //Create the upload command for the frontend to execute
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    //Generate presigned URL
    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    //Return URL + key
    return response(200, {
      uploadUrl,
      key,
    });

  } catch (err) {
    console.error("Error:", err);
    return response(500, { error: "Failed to generate upload URL" });
  }
};

// helper function for responses
function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "https://futureflow.me",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
} 