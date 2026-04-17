/// Recommendations Lambda Function
export const handler = async (event) => {
    try {
      const body = event.body ? JSON.parse(event.body) : null;
  
      if (!body) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            error: {
              code: "MISSING_BODY",
              message: "Request body is required"
            }
          })
        };
      }
  
      const { missingSkills, userType, universityId, prefer } = body;
  
      if (!Array.isArray(missingSkills)) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            error: {
              code: "INVALID_INPUT",
              message: "missingSkills must be an array"
            }
          })
        };
      }
  
      if (userType !== "student" && userType !== "professional") {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            error: {
              code: "INVALID_INPUT",
              message: "userType must be 'student' or 'professional'"
            }
          })
        };
      }
  
      const items = [];
  
      for (const skill of missingSkills) {
        if (
          userType === "student" &&
          universityId &&
          (!prefer || prefer.includes("university_course"))
        ) {
          items.push({
            id: `uni-${skill}`,
            missingSkill: skill,
            type: "university_course",
            title: `${skill} Course at ${universityId.toUpperCase()}`,
            provider: universityId.toUpperCase(),
            url: "https://example.com/university-course",
            confidence: 0.9
          });
        }
  
        if (!prefer || prefer.includes("online_course")) {
          items.push({
            id: `online-${skill}`,
            missingSkill: skill,
            type: "online_course",
            title: `Learn ${skill}`,
            provider: "Codecademy",
            url: "https://example.com/online-course",
            confidence: 0.8
          });
        }
  
        if (!prefer || prefer.includes("tutorial")) {
          items.push({
            id: `tutorial-${skill}`,
            missingSkill: skill,
            type: "tutorial",
            title: `${skill} Crash Course`,
            provider: "YouTube / Docs",
            url: "https://example.com/tutorial",
            confidence: 0.65
          });
        }
      }
  
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items })
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to generate recommendations"
          }
        })
      };
    }
  };