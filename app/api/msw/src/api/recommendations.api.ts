/// recommendations.api.ts
import { request } from "./http";
import type { RecommendationsRequest, RecommendationsResponse } from "../types/api.types";

export function getRecommendations(payload: RecommendationsRequest): Promise<RecommendationsResponse> {
  return request<RecommendationsResponse>("/api/v1/recommendations", {
    method: "POST",
    body: payload,
  });
}