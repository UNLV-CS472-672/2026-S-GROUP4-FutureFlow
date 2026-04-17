//Import the react hooks 
import {useMemo, useState} from "react";

//Import the shared header component
import { AuthHeader } from "../components/AuthHeader";
import { BarStackClipLayer } from "recharts/types/cartesian/BarStack";


/*
------------------
Type Definitions 
------------------
*/

type skillStatus = "not_started" | "in_progress" | "done"

//example skill item 
type skillItem = 
{
    id: number; //idenitifier 
    name: string; //skill name 
    priority: number; //ranking (lower means more important)
    status: skillStatus; //current progress
};

//Date for full page 
type careerPlanData = 
{
    targetRole: string; //role of user 
    readinessScore: number; 
    missingSkills: skillItem[];
    strengths: string[];
};

/*
------------------------------------------
Mock Data - Temp (will be filled in later)
------------------------------------------
*/

const initialCareerPlan: careerPlanData = 
{
    targetRole: "Frontend Developer",
    readinessScore: 67, 
    strengths: ["HTML", 'C++', "Python"],
    missingSkills: 
    [
        {id: 1, name: "TypeScript", priority: 1, status: "in_progress"},
        {id: 1, name: "React Testing", priority: 2, status: "done"},
        {id: 1, name: "State management", priority: 1, status: "not_started"},
        {id: 1, name: "Rest api integration", priority: 1, status: "not_started"}
    ],
};


/*
----------------------
Main Webpage Component
----------------------
*/

export default function CareerPlanTrackerPage()
{
    const [careerPlan, setCareerPlan] = useState<careerPlanData>(initialCareerPlan);


/*
-------------------------------------------------
Caclulations - for dsiplayed skills + career plan 
-------------------------------------------------
*/

//count the amount of completed skills
const completedCount = useMemo(() => 
{
    return careerPlan.missingSkills.filter(
        (skill) => skill.status === "done").length;
},
[careerPlan.missingSkills]);

//count the amount of in-progress skills 
const inProgressCount = useMemo(() => 
{
    return careerPlan.missingSkills.filter(
        (skill) => skill.status === "in_progress").length;
},
[careerPlan.missingSkills]);










