// analysis.handlers.ts

import { http, HttpResponse, delay } from "msw";
import { mockResume } from "../data/resume.data.ts";
import { mockJobs } from "../data/jobs.data";
import type { GapAnalysisResponse } from "../../types/api.types";

function unique(arr: string[]) {
  return Array.from(new Set(arr));
}

export const analysisHandlers = [
  http.post("/api/v1/analysis/gap", async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as { resumeId: string; jobId?: string; targetRole?: string };

    // In a real backend, resumeId would fetch stored resume skills
    const have = mockResume.normalizedSkills;

    let needed: string[] = [];
    if (body.jobId) {
      const job = mockJobs.find((j) => j.id === body.jobId);
      if (!job) {
        return HttpResponse.json(
          { error: { code: "JOB_NOT_FOUND", message: "Job not found" } },
          { status: 404 }
        );
      }
      needed = job.requiredSkills;
    } else {
      // role-based fallback: choose a “typical” set
      needed = ["HTML", "CSS", "JavaScript", "TypeScript"];
    }

    const neededUnique = unique(needed);
    const haveUnique = unique(have);

    const missing = neededUnique.filter((s) => !haveUnique.includes(s));
    const overlapCount = neededUnique.length - missing.length;
    const overlapScore = neededUnique.length === 0 ? 0 : overlapCount / neededUnique.length;

    const resp: GapAnalysisResponse = {
      jobId: body.jobId,
      targetRole: body.targetRole,
      skillsNeeded: neededUnique,
      skillsYouHave: haveUnique.filter((s) => neededUnique.includes(s)),
      missingSkills: missing,
      overlapScore: Number(overlapScore.toFixed(2)),
    };

    return HttpResponse.json(resp);
  }),
];