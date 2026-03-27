// analysis.handlers.ts
// Mock handlers for skill gap analysis.
//
// Compares a user's resume skills against job requirements
// and returns missing skills along with an overlap score.

import { http, HttpResponse, delay } from "msw";
import type { RecommendationsRequest, RecommendationsResponse } from "../../types/api.types";
import type { Recommendation } from "../../types/domain.types";

// Handlers for recommendation-related API endpoints
export const recommendationHandlers = [
  http.post("/api/v1/recommendations", async ({ request }) => {
    await delay(450);

    const body = (await request.json()) as RecommendationsRequest;

    // Generate mock recommendations based on missing skills and user type
    const items: Recommendation[] = body.missingSkills.flatMap((skill, idx) => {
      const base: Recommendation = {
        id: `rec_${idx}_${skill}`,
        missingSkill: skill,
        type: body.userType === "student" ? "university_course" : "online_course",
        title: body.userType === "student" ? `UNIV Course for ${skill}` : `Learn ${skill} Online`,
        provider: body.userType === "student" ? (body.universityId ?? "Your University") : "Codecademy",
        url: "https://example.com",
        confidence: 0.8,
      };

      // Add a second option for variety
      const alt: Recommendation = {
        id: `rec_alt_${idx}_${skill}`,
        missingSkill: skill,
        type: "tutorial",
        title: `${skill} Crash Course`,
        provider: "YouTube / Docs",
        url: "https://example.com",
        confidence: 0.6,
      };

      return [base, alt];
    });

    const resp: RecommendationsResponse = { items };
    return HttpResponse.json(resp);
  }),
];