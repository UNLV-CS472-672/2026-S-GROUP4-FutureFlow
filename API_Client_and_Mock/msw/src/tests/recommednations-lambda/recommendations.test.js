///
import { handler } from "./recommendations.mjs";

describe("getRecommendations Lambda", () => {
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

  test("returns 400 when missingSkills is not an array", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: "TypeScript",
        userType: "student",
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(parsedBody).toEqual({
      error: {
        code: "INVALID_INPUT",
        message: "missingSkills must be an array",
      },
    });
  });

  test("returns 400 when userType is invalid", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: ["TypeScript"],
        userType: "admin",
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(parsedBody).toEqual({
      error: {
        code: "INVALID_INPUT",
        message: "userType must be 'student' or 'professional'",
      },
    });
  });

  test("returns recommendations for a student", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: ["TypeScript"],
        userType: "student",
        universityId: "unlv",
        prefer: ["university_course", "online_course"],
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.items).toEqual([
      {
        id: "uni-TypeScript",
        missingSkill: "TypeScript",
        type: "university_course",
        title: "TypeScript Course at UNLV",
        provider: "UNLV",
        url: "https://example.com/university-course",
        confidence: 0.9,
      },
      {
        id: "online-TypeScript",
        missingSkill: "TypeScript",
        type: "online_course",
        title: "Learn TypeScript",
        provider: "Codecademy",
        url: "https://example.com/online-course",
        confidence: 0.8,
      },
    ]);
  });

  test("returns recommendations for a professional", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: ["CSS"],
        userType: "professional",
        prefer: ["online_course", "tutorial"],
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody.items).toEqual([
      {
        id: "online-CSS",
        missingSkill: "CSS",
        type: "online_course",
        title: "Learn CSS",
        provider: "Codecademy",
        url: "https://example.com/online-course",
        confidence: 0.8,
      },
      {
        id: "tutorial-CSS",
        missingSkill: "CSS",
        type: "tutorial",
        title: "CSS Crash Course",
        provider: "YouTube / Docs",
        url: "https://example.com/tutorial",
        confidence: 0.65,
      },
    ]);
  });
});