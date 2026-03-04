// jobs.data.ts
import type { ParsedResume } from "../../types/domain.types";
import type { Job } from "../../types/domain.types";

export const mockResume: ParsedResume = {
  resumeId: "r_123",
  extracted: {
    skills: ["HTML", "Git", "Teamwork"],
    education: [{ school: "UNLV", degree: "BS Computer Science", gradYear: 2026 }],
    experience: [{ title: "IT Intern", company: "Acme" }],
  },
  normalizedSkills: ["HTML", "Git", "Teamwork"],
};

export const mockJobs: Job[] = [
  {
    id: "job_1",
    title: "Frontend Intern",
    company: "Acme",
    type: "internship",
    location: "Remote",
    requiredSkills: ["HTML", "CSS", "JavaScript"],
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