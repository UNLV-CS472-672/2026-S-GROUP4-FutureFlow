// jobs.handlers.ts
import { http, HttpResponse, delay } from "msw";
import { mockJobs } from "../data/jobs.data";
import type { JobsSearchResponse } from "../../types/api.types";

export const jobsHandlers = [
  http.get("/api/v1/jobs", async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const q = (url.searchParams.get("query") ?? "").toLowerCase();
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");

    const filtered = q
      ? mockJobs.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.requiredSkills.some((s) => s.toLowerCase().includes(q))
        )
      : mockJobs;

    const start = (page - 1) * pageSize;

    const resp: JobsSearchResponse = {
      items: filtered.slice(start, start + pageSize),
      page,
      pageSize,
      total: filtered.length,
    };

    return HttpResponse.json(resp);
  }),

  http.get("/api/v1/jobs/:jobId", async ({ params }) => {
    await delay(200);

    const job = mockJobs.find((j) => j.id === params.jobId);
    if (!job) {
      return HttpResponse.json(
        { error: { code: "JOB_NOT_FOUND", message: "Job not found" } },
        { status: 404 }
      );
    }
    return HttpResponse.json(job);
  }),
];