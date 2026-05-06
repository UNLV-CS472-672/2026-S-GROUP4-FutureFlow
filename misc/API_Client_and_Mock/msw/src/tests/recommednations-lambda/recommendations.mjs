/// Recommendations Lambda Function
export const handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : null;

    if (!body) {
      return buildResponse(400, {
        error: {
          code: "MISSING_BODY",
          message: "Request body is required",
        },
      });
    }

    const { parsedResume, jobQuery, prefer } = body;

    if (!parsedResume || typeof parsedResume !== "object") {
      return buildResponse(400, {
        error: {
          code: "INVALID_INPUT",
          message: "parsedResume is required",
        },
      });
    }

    if (!jobQuery || typeof jobQuery !== "string") {
      return buildResponse(400, {
        error: {
          code: "INVALID_INPUT",
          message: "jobQuery must be a non-empty string",
        },
      });
    }

    const resumeSkills = extractResumeSkills(parsedResume);
    const requiredSkills = inferSkillsFromJobQuery(jobQuery);

    const normalizedResumeSkills = resumeSkills.map(normalizeSkill);

    const matchedSkills = requiredSkills.filter((skill) =>
      normalizedResumeSkills.includes(normalizeSkill(skill))
    );

    const missingSkills = requiredSkills.filter(
      (skill) => !normalizedResumeSkills.includes(normalizeSkill(skill))
    );

    const items = [];

    for (const skill of missingSkills) {
      if (!prefer || prefer.includes("online_course")) {
        items.push({
          id: `online-${slugify(skill)}`,
          missingSkill: skill,
          type: "online_course",
          title: `Learn ${skill}`,
          provider: "Codecademy",
          url: `https://example.com/learn/${slugify(skill)}`,
          confidence: 0.85,
        });
      }

      if (!prefer || prefer.includes("tutorial")) {
        items.push({
          id: `tutorial-${slugify(skill)}`,
          missingSkill: skill,
          type: "tutorial",
          title: `${skill} Crash Course`,
          provider: "YouTube / Docs",
          url: `https://example.com/tutorial/${slugify(skill)}`,
          confidence: 0.7,
        });
      }

      if (!prefer || prefer.includes("project")) {
        items.push({
          id: `project-${slugify(skill)}`,
          missingSkill: skill,
          type: "project",
          title: `Build a project using ${skill}`,
          provider: "FutureFlow",
          url: `https://example.com/projects/${slugify(skill)}`,
          confidence: 0.75,
        });
      }
    }

    return buildResponse(200, {
      jobQuery,
      inferredRole: parsedResume.metadata?.inferredRole ?? null,
      inferredSeniority: parsedResume.metadata?.inferredSeniority ?? null,
      matchedSkills,
      missingSkills,
      items,
    });
  } catch (error) {
    console.error("Recommendations error:", error);

    return buildResponse(500, {
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to generate recommendations",
      },
    });
  }
};

function buildResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
}

function extractResumeSkills(parsedResume) {
  const skills = parsedResume.skills || {};

  const combined = [
    ...(skills.technical || []),
    ...(skills.tools || []),
    ...(skills.soft || []),
    ...(skills.languages || []),
  ];

  // Also pull technologies from projects as bonus signals
  const projectTech = (parsedResume.projects || []).flatMap(
    (project) => project.technologies || []
  );

  // Also pull likely skills from experience bullet points
  const bulletSkills = extractSkillsFromExperience(parsedResume.experience || []);

  return [...new Set([...combined, ...projectTech, ...bulletSkills])];
}

function extractSkillsFromExperience(experience) {
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

function inferSkillsFromJobQuery(jobQuery) {
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

function normalizeSkill(skill) {
  return String(skill).trim().toLowerCase();
}

function slugify(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "-");
}