// analysis.api.ts
// API functions for skill gap analysis.
import { remotePost } from "./remote.api";
import type { GapAnalysisRequest, GapAnalysisResponse } from "../types/api.types";


// Compare a parsed resume against a job or target role
// and return the missing skills / overlap score.
export function gapAnalysis(
  payload: GapAnalysisRequest
): Promise<GapAnalysisResponse> {
  return remotePost<GapAnalysisResponse>("/analysis/gap", payload);
}