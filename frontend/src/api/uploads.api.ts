export type UploadResponse = {
  uploadUrl: string;
  key: string;
};

const UPLOAD_FILE_API_URL = import.meta.env.VITE_UPLOAD_FILE;
const STORE_RESUME_KEY_API_URL = import.meta.env.VITE_STORE_RESUME_KEY;
const PARSE_RESUME_API_URL = import.meta.env.VITE_PARSE_RESUME;

async function getUploadUrl(file: File, token: string): Promise<UploadResponse> {
  const res = await fetch(UPLOAD_FILE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to retrieve upload URL.');
  }

  return res.json();
}

async function uploadToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to upload file to S3.');
  }
}

async function uploadResumeToDatabase(key: string, token: string): Promise<void> {
  const res = await fetch(STORE_RESUME_KEY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileKey: key,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to save resume key to database.');
  }
}

async function parseResume(token: string): Promise<any> {
  const res = await fetch(PARSE_RESUME_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to parse resume.');
  }

  return res.json();
}

export async function uploadResume(file: File, token: string): Promise<any> {
  const data = await getUploadUrl(file, token);
  await uploadToS3(data.uploadUrl, file);
  await uploadResumeToDatabase(data.key, token);
  const parsedResume = await parseResume(token);

  return {
    ...data,
    parsedResume,
  };
}