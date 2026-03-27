// index.ts
// Central export for all mock API handlers.
//
// This file aggregates all domain-specific handlers into a single array,
// which is then used by MSW to intercept API requests.
import { resumeHandlers } from "./resumes.handlers";
import { jobsHandlers } from "./jobs.handlers";
import { analysisHandlers } from "./analysis.handlers";
import { recommendationHandlers } from "./recommendations.handlers";

// Combine all handlers into a single array for MSW
export const handlers = [
  ...resumeHandlers,
  ...jobsHandlers,
  ...analysisHandlers,
  ...recommendationHandlers,
];