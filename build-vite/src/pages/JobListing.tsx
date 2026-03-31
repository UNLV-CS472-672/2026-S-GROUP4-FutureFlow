{/*
  Front end TextScript file for "Job Listing" page.
*/}

import React from 'react';
import { AuthHeader } from '../components/AuthHeader';
import { useEffect, useState } from "react";

// gathers JobSelector
import JobSelector from '../components/JobSelector';

// gathers JobData
import { jobData } from '../components/JobData';

// gathers JobGoal
import JobGoal from '../components/JobGoal';


export default function JobListings() {
    const [job, setJob] = useState<string | null>(null);
    const selectedJobData = job ? jobData[job] : null;
    const [goals, setGoals] = useState<string[]>([]);

    // MOCK
    const userSkills = ["Insert Skill1 Here"];

    const [savedPlan, setSavedPlan] = useState<any>(null);

    const handleSaveGoal = (goal: string) => {
        setGoals(prev => [...prev, goal]);
    };

    const missingSkills = selectedJobData ?
        selectedJobData.skills.filter(skill => !userSkills.includes(skill)) :
        [];

    const recommendations = selectedJobData ? {
        certs: selectedJobData.certs,
        courses: selectedJobData.courses,
        projects: missingSkills.map(skill => `Build a Project With: ${skill}`)
    }
    : null;

    // MOCK
    const estimate = missingSkills.length > 0 ? {
        time: `${missingSkills.length * 2} - ${missingSkills.length * 4} weeks`,
        cost: `$${missingSkills.length * 50} - $${missingSkills.length * 200}`
    }
    : null;

    const handleSavePlan = () => {
        setSavedPlan({
            job,
            missingSkills,
            recommendations,
            estimate
        });
    };

    return (
        <div>

            <JobSelector onSelect = {setJob} />
            {job && <h1>{job}</h1>}

            { selectedJobData && (
                <div>
                    <h2> Skills </h2>
                    <ul>
                        {selectedJobData.skills.map((skill, i) => {
                            const isMissing = !userSkills.includes(skill)
                            return (
                            <li key = {i}>
                                {skill}
                                {isMissing && "(Missing)"}
                            </li>
                            );
                        })}
                    </ul>

                    <h2> Certifications </h2>
                    <h3> Required Certifications </h3>
                        <ul>
                            { selectedJobData.certs.map((cert, i) => (
                                <li key = {i}>{cert}</li>
                            ))}
                        </ul>
                    <h3> Recommended Certifications </h3>
                        <ul>
                            {recommendations?.certs.map((cert, i) => (
                                <li key = {i}>{cert}</li>
                            ))}
                        </ul>

                    <h2> Courses </h2>
                    <h3> Required Courses </h3>
                        <ul>
                            { selectedJobData.courses.map((course, i) => (
                                <li key = {i}>{course}</li>
                            ))}
                        </ul>
                    <h3> Recommended Courses </h3>
                        <ul>
                            {recommendations?.courses.map((course, i) => (
                                <li key = {i}> {course} </li>
                            ))}
                        </ul>

                    <h2> Projects </h2>
                    <ul>
                        {recommendations?.projects.map((proj, i) => (
                            <li key = {i}> {proj} </li>
                        ))}
                    </ul>

                    <JobGoal onSave = {handleSaveGoal} />

                    <div>
                        <h2> Saved Goals </h2>
                        <ul>
                            {goals.map((goal, i) => (
                                <li key = {i}>{goal}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            )}

        </div>
    );

}
