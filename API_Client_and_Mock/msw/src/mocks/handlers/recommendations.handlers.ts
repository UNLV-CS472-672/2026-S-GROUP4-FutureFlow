// recommendations.handlers.ts
import { http, HttpResponse, delay } from "msw";
import type { RecommendationsRequest, RecommendationsResponse } from "../../types/api.types";
import type { Recommendation } from "../../types/domain.types";

export const recommendationHandlers = [
  http.post("/api/v1/recommendations", async ({ request }) => {
    await delay(450);

    const body = (await request.json()) as RecommendationsRequest;

    // Validate required fields
    if (!body) {
      return HttpResponse.json(
        {
          error: {
            code: "MISSING_BODY",
            message: "Request body is required",
          },
        },
        { status: 400 }
      );
    }

    if (!body.parsedResume || typeof body.parsedResume !== "object") {
      return HttpResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message: "parsedResume is required",
          },
        },
        { status: 400 }
      );
    }

    if (!body.jobQuery || typeof body.jobQuery !== "string") {
      return HttpResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message: "jobQuery must be a non-empty string",
          },
        },
        { status: 400 }
      );
    }

    const resumeSkills = extractResumeSkills(body.parsedResume);
    const requiredSkills = inferSkillsFromJobQuery(body.jobQuery);

    const normalizedResumeSkills = resumeSkills.map(normalizeSkill);

    const matchedSkills = requiredSkills.filter((skill) =>
      normalizedResumeSkills.includes(normalizeSkill(skill))
    );

    const missingSkills = requiredSkills.filter(
      (skill) => !normalizedResumeSkills.includes(normalizeSkill(skill))
    );

    const items: Recommendation[] = missingSkills.flatMap((skill) => {
      const recs: Recommendation[] = [];

      if (!body.prefer || body.prefer.includes("online_course")) {
        recs.push({
          id: `online-${slugify(skill)}`,
          missingSkill: skill,
          type: "online_course",
          title: `Learn ${skill}`,
          provider: "Codecademy",
          url: `https://example.com/learn/${slugify(skill)}`,
          confidence: 0.85,
        });
      }

      if (!body.prefer || body.prefer.includes("tutorial")) {
        recs.push({
          id: `tutorial-${slugify(skill)}`,
          missingSkill: skill,
          type: "tutorial",
          title: `${skill} Crash Course`,
          provider: "YouTube / Docs",
          url: `https://example.com/tutorial/${slugify(skill)}`,
          confidence: 0.7,
        });
      }

      if (!body.prefer || body.prefer.includes("project")) {
        recs.push({
          id: `project-${slugify(skill)}`,
          missingSkill: skill,
          type: "project",
          title: `Build a project using ${skill}`,
          provider: "FutureFlow",
          url: `https://example.com/projects/${slugify(skill)}`,
          confidence: 0.75,
        });
      }

      return recs;
    });

    const resp: RecommendationsResponse = {
      jobQuery: body.jobQuery,
      inferredRole: body.parsedResume.metadata?.inferredRole ?? null,
      inferredSeniority: body.parsedResume.metadata?.inferredSeniority ?? null,
      matchedSkills,
      missingSkills,
      items,
    };

    return HttpResponse.json(resp);
  }),
];

function extractResumeSkills(parsedResume: RecommendationsRequest["parsedResume"]): string[] {
  const skills = parsedResume.skills || {
    technical: [],
    soft: [],
    languages: [],
    tools: [],
  };

  const combined = [
    ...(skills.technical || []),
    ...(skills.tools || []),
    ...(skills.soft || []),
    ...(skills.languages || []),
  ];

  const projectTech = (parsedResume.projects || []).flatMap(
    (project) => project.technologies || []
  );

  const bulletSkills = extractSkillsFromExperience(parsedResume.experience || []);

  return [...new Set([...combined, ...projectTech, ...bulletSkills])];
}

function extractSkillsFromExperience(
  experience: Array<{ bulletPoints?: string[] }>
): string[] {
  const knownSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Git",
    "Python",
    "Java",
    "SQL",
    "AWS",
    "Docker",
    "C++",
    "REST APIs",
    "MongoDB",
    "Excel",
  ];

  const allText = experience
    .flatMap((job) => job.bulletPoints || [])
    .join(" ")
    .toLowerCase();

  return knownSkills.filter((skill) =>
    allText.includes(skill.toLowerCase())
  );
}

function inferSkillsFromJobQuery(jobQuery: string): string[] {
  const query = jobQuery.toLowerCase();

  if (query.includes("frontend")) {
    return ["HTML", "CSS", "JavaScript", "React", "Git"];
  }

  if (query.includes("backend")) {
    return ["Node.js", "SQL", "REST APIs", "Git"];
  }

  if (query.includes("full stack")) {
    return ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git"];
  }

  if (query.includes("data analyst")) {
    return ["SQL", "Python", "Excel"];
  }

  if (query.includes("software engineer")) {
    return ["JavaScript", "Git", "REST APIs"];
  }

  return ["Communication", "Problem Solving", "Git"];
}

function normalizeSkill(skill: string): string {
  return String(skill).trim().toLowerCase();
}

function slugify(value: string): string {
  return String(value).trim().toLowerCase().replace(/\s+/g, "-");
}