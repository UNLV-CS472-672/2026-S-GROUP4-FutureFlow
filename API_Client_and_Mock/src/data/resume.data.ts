// 
import type {ParsedResume} from "../types/domain.types";
// import a typescript type definiton 

export const mockResume: ParsedResume = 
{
    resumeId: "r_123",
    extracted:
    {
        skills: ["HTML", "Git", "Teamwork"],
        // skills read from Resume 

        education: 
        [{
            school: "UNLV",
            degree: "BS Computer Science",
            gradYear: 2026
        }],
        // parse users education history

        experience: 
        [{
            title: "IT intern",
            company: "Acme"
        }],
        // get the users work history
    },

    normalizedSkills: ["HTML", "Git", "Teamwork"]
};
