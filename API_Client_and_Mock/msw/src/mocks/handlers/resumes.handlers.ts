// resumes.handlers.ts
// Mock handlers related to resume parsing and processing.
//
// Simulates backend behavior for extracting and normalizing
// data from a user's uploaded resume.
import { http, HttpResponse, delay } from "msw";
import { mockResume } from "../data/resume.data.ts";

// Handlers for resume-related API endpoints
export const resumeHandlers = [
  http.post("/api/v1/resumes/parse", async () => {
    // Simulate some latency so you can see loading UI
    await delay(600);

    // You could add "failure modes" too:
    // return HttpResponse.json({ error: { code: "RESUME_PARSE_FAILED", message: "Could not parse resume" } }, { status: 422 });
    
    // Return the mock resume data
    return HttpResponse.json(mockResume);
  }),
];