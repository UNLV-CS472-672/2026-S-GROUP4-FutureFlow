// resume.data.ts
import type { ParsedResume } from "../../types/domain.types";

export const mockResume: ParsedResume = {
  resumeId: "r_123",
  extracted: {
    skills: ["HTML", "Git", "Teamwork"],
    education: [{ school: "UNLV", degree: "BS Computer Science", gradYear: 2026 }],
    experience: [{ title: "IT Intern", company: "Acme" }],
  },
  normalizedSkills: ["HTML", "Git", "Teamwork"],
};