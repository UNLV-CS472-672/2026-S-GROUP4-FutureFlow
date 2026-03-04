/// analysis.api.ts
import { request } from "./http";
import type { GapAnalysisRequest, GapAnalysisResponse } from "../types/api.types";

export function gapAnalysis(payload: GapAnalysisRequest): Promise<GapAnalysisResponse> {
  return request<GapAnalysisResponse>("/api/v1/analysis/gap", {
    method: "POST",
    body: payload,
  });
}