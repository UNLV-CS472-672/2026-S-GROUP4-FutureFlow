import type { Recommendation } from "./domain.types";

export type RecommendationPreference =
  | "online_course"
  | "tutorial"
  | "project";

export type ParsedResumeForRecommendations = {
  basicInfo?: {
    fullName?: string | null;
    email?: string | null;
    phone?: string | null;
    location?: string | null;
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
    summary?: string | null;
  };

  education?: unknown[];

  experience?: Array<{
    company?: string | null;
    title?: string | null;
    location?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    bulletPoints?: string[];
  }>;

  projects?: Array<{
    name?: string | null;
    description?: string | null;
    technologies?: string[];
    link?: string | null;
    role?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    bulletPoints?: string[];
    githubLink?: string | null;
    liveDemoLink?: string | null;
  }>;

  certifications?: unknown[];

  skills?: {
    technical?: string[];
    soft?: string[];
    languages?: string[];
    tools?: string[];
  };

  metadata?: {
    parsingDate?: string | null;
    confidenceScore?: unknown;
    warnings?: string[];
    inferredRole?: string | null;
    inferredSeniority?: string | null;
  };
};

export type RecommendationsRequest = {
  parsedResume: ParsedResumeForRecommendations;
  jobQuery: string;
  prefer?: RecommendationPreference[];
};

export type RecommendationsResponse = {
  jobQuery: string;
  inferredRole: string | null;
  inferredSeniority: string | null;
  matchedSkills: string[];
  missingSkills: string[];
  items: Recommendation[];
};