// jobs.api.ts
// API functions for retrieving job listings and job details.

import { remoteGet } from "./remote.api";
import { toQueryString } from "./http";
import type { JobsSearchQuery, JobsSearchResponse } from "../types/api.types";
import type { Job } from "../types/domain.types";

/**
 * Search jobs with optional filters such as query, type, location, and pagination.
 */
export function searchJobs(query: JobsSearchQuery): Promise<JobsSearchResponse> {
  const qs = toQueryString(query);
  return remoteGet<JobsSearchResponse>(`/jobs${qs}`);
}

/**
 * Get full details for a single job by ID.
 */
export function getJob(jobId: string): Promise<Job> {
  return remoteGet<Job>(`/jobs/${encodeURIComponent(jobId)}`);
}