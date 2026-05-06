// domain.types.ts
// This file defines the core domain models used throughout the application.
// These types represent real-world entities such as jobs, skills,
// resume data, and recommendations.

// Represents the type of user interacting with the system.
// Used to customize behavior (e.g., students vs professionals).
export type UserType = "student" | "professional";

// Represents a normalized skill name extracted from resumes
// or required by job listings.
export type SkillName = string;

// Defines supported job categories.
export type JobType = "internship" | "full-time" | "part-time";

// Represents a job or internship listing.
export type Job = {
  id: string;                 // Unique identifier for the job
  title: string;              // Job title (e.g., "Frontend Developer")
  company: string;            // Company offering the job
  location?: string;          // Optional job location
  type?: JobType;             // Type of job (internship, full-time, etc.)
  description?: string;       // Optional job description
  requiredSkills: SkillName[];// Skills required for the role
  preferredSkills?: SkillName[]; // Optional preferred skills
  url?: string;               // Link to the job posting
};

// Represents the result of comparing a user's resume
// with a job or target role.
export type GapAnalysis = {
  jobId?: string;             // Job used for comparison (if applicable)
  targetRole?: string;        // Alternative comparison using a role instead of a job
  skillsNeeded: SkillName[];  // Skills required for the job/role
  skillsYouHave: SkillName[]; // Skills extracted from the user's resume
  missingSkills: SkillName[]; // Skills the user is lacking
  overlapScore: number;       // Match score between 0 and 1
};

// Types of learning resources that can be recommended.
export type RecommendationType =
  | "university_course"
  | "online_course"
  | "certificate"
  | "tutorial";

// Represents a recommended resource to help the user
// learn missing skills.
export type Recommendation = {
  id: string;                 // Unique recommendation ID
  missingSkill: SkillName;    // Skill this resource helps improve
  type: RecommendationType;   // Type of resource
  title: string;              // Name of the course/tutorial
  provider: string;           // Organization providing the resource
  url?: string;               // Link to the resource
  price?: { amount: number; currency: "USD" }; // Optional pricing info
  duration?: string;          // Approximate duration (e.g., "6 weeks")
  confidence?: number;        // Relevance score (0–1)
  affiliate?: {               // Optional affiliate tracking information
    provider: string;
    code?: string;
    trackingUrl?: string;
  };
};

// Represents the parsed result of a user's uploaded resume.
export type ParsedResume = {
  resumeId: string;           // Unique identifier for the parsed resume

  extracted: {
    skills: SkillName[];      // Raw skills extracted from the resume
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

  // Normalized skills used for comparison and analysis
  normalizedSkills: SkillName[];
};