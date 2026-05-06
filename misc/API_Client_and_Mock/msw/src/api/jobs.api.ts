/// jobs.api.ts
import type { GapAnalysis, Job, ParsedResume, Recommendation, SkillName, UserType } from "../types/domain.types";

// Generic pagination wrapper used by job searches (and later anything else)
export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

// Standard error shape (nice for debugging + consistent backend contract)
export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

// ---- Requests / Responses ----

export type ResumeParseResponse = ParsedResume;

export type JobsSearchQuery = {
  query?: string;
  type?: string;      // keep as string to avoid hard coupling
  location?: string;
  page?: number;
  pageSize?: number;
};

export type JobsSearchResponse = Paginated<Job>;

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

export type GapAnalysisResponse = GapAnalysis;

export type RecommendationsRequest = {
  missingSkills: SkillName[];
  userType: UserType;
  universityId?: string;
  prefer?: Array<"university_course" | "online_course" | "certificate" | "tutorial">;
};

export type RecommendationsResponse = {
  items: Recommendation[];
};