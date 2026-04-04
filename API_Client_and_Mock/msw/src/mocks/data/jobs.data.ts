// jobs.data.ts
// This file contains mock data used by MSW handlers to simulate backend responses.
// It includes sample resume data and job listings for testing frontend features
// such as job search, gap analysis, and recommendations.

import type { ParsedResume } from "../../types/domain.types";
import type { Job } from "../../types/domain.types";

/**
 * Mock parsed resume data.
 * Simulates the result returned from the resume parsing API.
 */
export const mockResume: ParsedResume = {
  resumeId: "r_123", // Unique identifier for the resume

  extracted: {
    // Raw data extracted from the resume
    skills: ["HTML", "Git", "Teamwork"],
    education: [
      {
        school: "UNLV",
        degree: "BS Computer Science",
        gradYear: 2026,
      },
    ],
    experience: [
      {
        title: "IT Intern",
        company: "Acme",
      },
    ],
  },

  // Normalized skills used for matching and analysis
  normalizedSkills: ["HTML", "Git", "Teamwork"],
};

/**
 * Mock job listings.
 * Used to simulate job search results and job detail endpoints.
 */
export const mockJobs: Job[] = [
  {
    id: "job_1",                 // Unique job ID
    title: "Frontend Intern",    // Job title
    company: "Acme",             // Company name
    type: "internship",          // Job type
    location: "Remote",          // Job location

    // Skills required to qualify for the job
    requiredSkills: ["HTML", "CSS", "JavaScript"],

    // Optional skills that are nice to have
    preferredSkills: ["React"],
  },
  {
    id: "job_2",
    title: "Junior Web Developer",
    company: "Tech Corp",
    type: "full-time",
    location: "Las Vegas, NV",

    requiredSkills: ["JavaScript", "HTML", "CSS"],
    preferredSkills: ["TypeScript"],
  },
];