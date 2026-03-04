// domain.types.ts
// This file defines the core domain models used throughout the frontend.
// These types represent real-world entities in the application such as
// jobs, skills, recommendations, and parsed resume data.

// Represents the type of user interacting with the system.
// Used to customize recommendations (students vs professionals).
export type UserType = "student" | "professional";

// Represents the normalized name of a skill extracted from a resume
// or required by a job posting.
export type SkillName = string;

// Job categories supported by the system.
export type JobType = "internship" | "full-time" | "part-time";

// Represents a job or internship listing returned from the backend.
export type Job = {
  id: string;                // Unique identifier for the job
  title: string;             // Job title (e.g., Frontend Developer)
  company: string;           // Company offering the job
  location?: string;         // Optional job location
  type?: JobType;            // Internship, full-time, etc.
  description?: string;      // Optional detailed job description
  requiredSkills: SkillName[];   // Skills required for the role
  preferredSkills?: SkillName[]; // Optional preferred skills
  url?: string;              // Link to the job posting
};

// Result of comparing a user's resume with a job or role.
export type GapAnalysis = {
  jobId?: string;            // Job used for comparison
  targetRole?: string;       // Alternative comparison against a role instead of a specific job
  skillsNeeded: SkillName[]; // Skills required for the job/role
  skillsYouHave: SkillName[];// Skills found in the user's resume
  missingSkills: SkillName[];// Skills missing from the resume
  overlapScore: number;      // Percentage match (0.0 – 1.0)
};

// Types of educational resources the system may recommend.
export type RecommendationType =
  | "university_course"
  | "online_course"
  | "certificate"
  | "tutorial";

// Represents a learning resource suggested to the user to fill skill gaps.
export type Recommendation = {
  id: string;                // Unique recommendation ID
  missingSkill: SkillName;   // Skill this resource helps improve
  type: RecommendationType;  // Type of resource
  title: string;             // Course/tutorial name
  provider: string;          // Organization providing the resource
  url?: string;              // Link to the resource
  price?: { amount: number; currency: "USD" }; // Optional pricing info
  duration?: string;         // Approximate course length
  confidence?: number;       // How relevant the recommendation is (0–1)
  affiliate?: {              // Optional affiliate information for partnerships
    provider: string;
    code?: string;
    trackingUrl?: string;
  };
};

// Structure returned after parsing a user's resume.
export type ParsedResume = {
  resumeId: string;          // Unique ID generated for the parsed resume

  extracted: {
    skills: SkillName[];     // Raw skills extracted from the resume
    education?: Array<{
      school: string;
      degree?: string;
      gradYear?: number;
    }>;
    experience?: Array<{
      title?: string;
      company?: string;
    }>;
  };

  // Normalized skill list used for comparisons and gap analysis
  normalizedSkills: SkillName[];
};