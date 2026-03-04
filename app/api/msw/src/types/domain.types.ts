// domain.types.ts

export type UserType = "student" | "professional";

export type SkillName = string;

export type JobType = "internship" | "full-time" | "part-time";

export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  type?: JobType;
  description?: string;
  requiredSkills: SkillName[];
  preferredSkills?: SkillName[];
  url?: string;
};

export type GapAnalysis = {
  jobId?: string;
  targetRole?: string;
  skillsNeeded: SkillName[];
  skillsYouHave: SkillName[];
  missingSkills: SkillName[];
  overlapScore: number; // 0..1
};

export type RecommendationType =
  | "university_course"
  | "online_course"
  | "certificate"
  | "tutorial";

export type Recommendation = {
  id: string;
  missingSkill: SkillName;
  type: RecommendationType;
  title: string;
  provider: string;
  url?: string;
  price?: { amount: number; currency: "USD" };
  duration?: string;
  confidence?: number; // 0..1
  affiliate?: { provider: string; code?: string; trackingUrl?: string };
};

export type ParsedResume = {
  resumeId: string;
  extracted: {
    skills: SkillName[];
    education?: Array<{ school: string; degree?: string; gradYear?: number }>;
    experience?: Array<{ title?: string; company?: string }>;
  };
  normalizedSkills: SkillName[];
};