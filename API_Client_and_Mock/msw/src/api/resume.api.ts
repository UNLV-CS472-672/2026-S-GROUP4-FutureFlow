// resume.api.ts
// API functions for uploading and parsing resumes.

import { request } from "./http";
import type { ResumeParseResponse } from "../types/api.types";
import type { UserType } from "../types/domain.types";

/**
 * Upload a resume file and return parsed/normalized resume data.
 */
export async function parseResume(
  file: File,
  userType?: UserType
): Promise<ResumeParseResponse> {
  const formData = new FormData();
  formData.append("file", file);

  if (userType) {
    formData.append("userType", userType);
  }

  return request<ResumeParseResponse>("/api/v1/resumes/parse", {
    method: "POST",
    body: formData,
  });
}