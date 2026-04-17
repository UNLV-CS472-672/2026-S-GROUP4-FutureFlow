/// recommendations.test.js

// Import the Lambda handler function we want to test
import { handler } from "./recommendations.mjs";

// Describe block groups all tests related to getRecommendations Lambda
describe("getRecommendations Lambda", () => {

  // Test case: when no body is provided in the request
  test("returns 400 when body is missing", async () => {
    const event = {}; // Simulates an empty request event

    // Call the Lambda handler
    const response = await handler(event);

    // Parse the JSON response body
    const parsedBody = JSON.parse(response.body);

    // Expect HTTP status code 400 (Bad Request)
    expect(response.statusCode).toBe(400);

    // Expect a specific error response structure
    expect(parsedBody).toEqual({
      error: {
        code: "MISSING_BODY",
        message: "Request body is required",
      },
    });
  });

  // Test case: missingSkills should be an array, not a string
  test("returns 400 when missingSkills is not an array", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: "TypeScript", // Invalid: should be an array
        userType: "student",
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    // Expect HTTP 400 due to invalid input
    expect(response.statusCode).toBe(400);

    // Validate error message for wrong type
    expect(parsedBody).toEqual({
      error: {
        code: "INVALID_INPUT",
        message: "missingSkills must be an array",
      },
    });
  });

  // Test case: userType must be either 'student' or 'professional'
  test("returns 400 when userType is invalid", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: ["TypeScript"],
        userType: "admin", // Invalid user type
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    // Expect HTTP 400 due to invalid userType
    expect(response.statusCode).toBe(400);

    // Validate correct error message
    expect(parsedBody).toEqual({
      error: {
        code: "INVALID_INPUT",
        message: "userType must be 'student' or 'professional'",
      },
    });
  });

  // Test case: valid request for a student user
  test("returns recommendations for a student", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: ["TypeScript"], // Skills the user wants to learn
        userType: "student",
        universityId: "unlv", // Used to generate university-specific recommendations
        prefer: ["university_course", "online_course"], // Preferred resource types
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    // Expect success response
    expect(response.statusCode).toBe(200);

    // Expect a list of recommendations tailored for a student
    expect(parsedBody.items).toEqual([
      {
        id: "uni-TypeScript", // Unique ID for university course
        missingSkill: "TypeScript",
        type: "university_course",
        title: "TypeScript Course at UNLV",
        provider: "UNLV",
        url: "https://example.com/university-course",
        confidence: 0.9, // Higher confidence for university course
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

  // Test case: valid request for a professional user
  test("returns recommendations for a professional", async () => {
    const event = {
      body: JSON.stringify({
        missingSkills: ["CSS"], // Skill to improve
        userType: "professional",
        prefer: ["online_course", "tutorial"], // Preferred learning formats
      }),
    };

    const response = await handler(event);
    const parsedBody = JSON.parse(response.body);

    // Expect success response
    expect(response.statusCode).toBe(200);

    // Expect recommendations tailored for professionals
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