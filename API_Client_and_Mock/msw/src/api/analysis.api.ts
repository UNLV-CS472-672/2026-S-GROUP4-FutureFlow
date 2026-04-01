// analysis.api.ts
// API functions for performing skill gap analysis.
//
// This module provides a function to compare a user's resume
// against a job or target role and return missing skills,
// matching skills, and an overlap score.

import { request } from "./http";
import type { GapAnalysisRequest, GapAnalysisResponse } from "../types/api.types";

/**
 * Sends a request to the backend to perform skill gap analysis.
 *
 * @param payload - Contains the resume ID and either a job ID
 *                  or target role for comparison.
 *
 * @returns A promise resolving to the gap analysis result,
 *          including missing skills and match score.
 */
export function gapAnalysis(
  payload: GapAnalysisRequest
): Promise<GapAnalysisResponse> {
  return request<GapAnalysisResponse>("/api/v1/analysis/gap", {
    method: "POST",
    body: payload,
  });
}