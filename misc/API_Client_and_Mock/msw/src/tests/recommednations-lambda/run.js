import { handler } from "./recommendations.mjs";

const event = {
  body: JSON.stringify({
    jobQuery: "frontend developer internship",
    prefer: ["online_course", "tutorial"],

    parsedResume: {
      basicInfo: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: null,
        location: "Las Vegas, NV",
        linkedin: null,
        github: null,
        portfolio: null,
        summary: null
      },

      education: [],

      experience: [
        {
          company: "Student Project",
          title: "Frontend Developer",
          location: null,
          startDate: null,
          endDate: null,
          bulletPoints: [
            "Built a website using HTML CSS and JavaScript",
            "Used Git for version control"
          ]
        }
      ],

      projects: [
        {
          name: "Portfolio Website",
          description: "Personal portfolio",
          technologies: ["HTML", "CSS", "JavaScript"],
          link: null,
          role: "Developer",
          startDate: null,
          endDate: null,
          bulletPoints: ["Built responsive UI"],
          githubLink: null,
          liveDemoLink: null
        }
      ],

      certifications: [],

      skills: {
        technical: ["HTML", "CSS", "JavaScript"],
        soft: ["Communication"],
        languages: ["English"],
        tools: ["Git"]
      },

      metadata: {
        parsingDate: "2026-04-20",
        confidenceScore: null,
        warnings: [],
        inferredRole: "Frontend Developer",
        inferredSeniority: "Junior"
      }
    }
  })
};

const response = await handler(event);

console.log("RAW RESPONSE:", response);

const parsedBody = JSON.parse(response.body);
console.log("PARSED BODY:", parsedBody);
console.log("MATCHED:", parsedBody.matchedSkills);
console.log("MISSING:", parsedBody.missingSkills);
console.log("ITEMS:", parsedBody.items);