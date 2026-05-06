// jobs.handlers.ts
import { http, HttpResponse, delay } from "msw";
import { mockResume } from "../data/resume.data.ts";

export const resumeHandlers = [
  http.post("/api/v1/resumes/parse", async () => {
    // Simulate some latency so you can see loading UI
    await delay(600);

    // You could add "failure modes" too:
    // return HttpResponse.json({ error: { code: "RESUME_PARSE_FAILED", message: "Could not parse resume" } }, { status: 422 });

    return HttpResponse.json(mockResume);
  }),
];