import { handler } from "./recommendations.mjs";

describe("resume recommendations Lambda", () => {
  test("returns 400 when body is missing", async () => {
    const event = {};

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(parsedBody).toEqual({
      error: {
        code: "MISSING_BODY",
        message: "Request body is required",
      },
    });
  });

  test("returns 400 when parsedResume is missing", async () => {
    const event = {
      body: JSON.stringify({
        jobQuery: "frontend developer internship",
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(parsedBody).toEqual({
      error: {
        code: "INVALID_INPUT",
        message: "parsedResume is required",
      },
    });
  });

  test("returns recommendations based on parsed resume and job query", async () => {
    const event = {
      body: JSON.stringify({
        parsedResume: {
          basicInfo: {
            fullName: "Jane Doe",
            email: "jane@example.com",
            phone: null,
            location: "Las Vegas, NV",
          },
          education: [],
          experience: [],
          projects: [],
          certifications: [],
          skills: {
            technical: ["HTML", "CSS", "JavaScript"],
            soft: ["Communication"],
            languages: ["English"],
            tools: ["Git"],
          },
          metadata: {
            parsingDate: "2026-04-16",
            confidenceScore: null,
            warnings: [],
            inferredRole: "Frontend Developer",
            inferredSeniority: "Junior",
          },
        },
        jobQuery: "frontend developer internship",
        prefer: ["online_course", "tutorial"],
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.jobQuery).toBe("frontend developer internship");
    expect(parsedBody.inferredRole).toBe("Frontend Developer");
    expect(parsedBody.matchedSkills).toEqual(["HTML", "CSS", "JavaScript", "Git"]);
    expect(parsedBody.missingSkills).toEqual(["React"]);
    expect(parsedBody.items).toEqual([
      {
        id: "online-react",
        missingSkill: "React",
        type: "online_course",
        title: "Learn React",
        provider: "Codecademy",
        url: "https://example.com/learn/react",
        confidence: 0.85,
      },
      {
        id: "tutorial-react",
        missingSkill: "React",
        type: "tutorial",
        title: "React Crash Course",
        provider: "YouTube / Docs",
        url: "https://example.com/tutorial/react",
        confidence: 0.7,
      },
    ]);
  });
});