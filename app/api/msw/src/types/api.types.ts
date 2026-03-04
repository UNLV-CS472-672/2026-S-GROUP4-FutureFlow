// api.types.ts
// This file defines the request and response shapes used when
// communicating with backend API endpoints.

import type { GapAnalysis, Job, ParsedResume, Recommendation, SkillName, UserType } from "./domain.types";


// Generic wrapper for paginated API responses.
// Many endpoints (like job listings) return results in pages.
export type Paginated<T> = {
  items: T[];        // Data items for the current page
  page: number;      // Current page number
  pageSize: number;  // Number of items per page
  total: number;     // Total number of items available
};


// Standard error format returned from API endpoints.
// Helps maintain consistent error handling across the frontend.
export type ApiErrorBody = {
  error: {
    code: string;     // Machine-readable error code
    message: string;  // Human-readable error message
    details?: unknown;// Optional additional debug info
  };
};


// ---- Requests / Responses ----


// Response returned when a resume is successfully parsed.
export type ResumeParseResponse = ParsedResume;


// Query parameters used when searching for jobs.
export type JobsSearchQuery = {
  query?: string;      // Search keyword
  type?: string;       // Job type filter (kept flexible as string)
  location?: string;   // Location filter
  page?: number;       // Pagination page
  pageSize?: number;   // Number of results per page
};


// Response structure for job search requests.
export type JobsSearchResponse = Paginated<Job>;


// Request sent to perform a skill gap analysis.
// This supports two modes:
// 1. Compare resume against a specific job
// 2. Compare resume against a target role
export type GapAnalysisRequest =
  | {
      resumeId: string;
      jobId: string;
      includeUniversityCourses?: boolean;
      universityId?: string;
    }
  | {
      resumeId: string;
      targetRole: string;
      includeUniversityCourses?: boolean;
      universityId?: string;
    };


// Response returned after performing gap analysis.
export type GapAnalysisResponse = GapAnalysis;


// Request for recommended courses or learning resources.
export type RecommendationsRequest = {
  missingSkills: SkillName[];   // Skills the user needs to learn
  userType: UserType;           // Student or professional
  universityId?: string;        // Optional university context
  prefer?: Array<"university_course" | "online_course" | "certificate" | "tutorial">;
};


// Response containing suggested resources to fill skill gaps.
export type RecommendationsResponse = {
  items: Recommendation[];
};