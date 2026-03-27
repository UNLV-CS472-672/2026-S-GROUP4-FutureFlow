// recommendations.api.ts
// API functions for course and learning recommendations.

import { remotePost } from "./remote.api";
import type {
  RecommendationsRequest,
  RecommendationsResponse,
} from "../types/api.types";

/**
 * Request recommended courses/resources for the user's missing skills.
 */
export function getRecommendations(
  payload: RecommendationsRequest
): Promise<RecommendationsResponse> {
  return remotePost<RecommendationsResponse>("/recommendations", payload);
}