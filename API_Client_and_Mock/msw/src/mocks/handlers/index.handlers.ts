/// index.handlers.ts
import { resumeHandlers } from "./resumes.handlers";
import { jobsHandlers } from "./jobs.handlers";
import { analysisHandlers } from "./analysis.handlers";
import { recommendationHandlers } from "./recommendations.handlers";

export const handlers = [
  ...resumeHandlers,
  ...jobsHandlers,
  ...analysisHandlers,
  ...recommendationHandlers,
];