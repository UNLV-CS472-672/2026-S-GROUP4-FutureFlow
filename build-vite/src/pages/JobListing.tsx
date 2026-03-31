/*
  Front end TypeScript file for "Job Listing" page.
*/

import React, { useEffect, useState } from "react";
import { AuthHeader } from "../components/AuthHeader";
import JobSelector from "../components/JobSelector";
import JobGoal from "../components/JobGoal";

type Job = {
  id?: number;
  job_title: string;
  url: string;
  date_posted: string | null;
  company: string | null;
  location: string | null;
  remote: boolean;
  hybrid: boolean;
  employment_statuses: string[];
  description: string | null;
  seniority: string | null;
};

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [job, setJob] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [savedPlan, setSavedPlan] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your real backend URL if needed
  const API_BASE_URL = "http://localhost:3000";

  // MOCK user skills for now
  const userSkills = ["Insert Skill1 Here"];

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/jobs`);

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }

        const data: Job[] = await response.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError("Could not load jobs from the database.");
      } finally {
        setLoading(false);
      }
    }

    void loadJobs();
  }, []);

  const selectedJobData = job
    ? jobs.find((j) => j.job_title === job) ?? null
    : null;

  const handleSaveGoal = (goal: string) => {
    setGoals((prev) => [...prev, goal]);
  };

  // Since your MariaDB jobs table does not currently include skills/certs/courses,
  // these are placeholders until you add those fields or another related table.
  const missingSkills: string[] = [];

  const recommendations = selectedJobData
    ? {
        certs: [],
        courses: [],
        projects: []
      }
    : null;

  const estimate =
    missingSkills.length > 0
      ? {
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
      <AuthHeader />

      <h1>Job Listings</h1>

      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          {/* If your existing JobSelector only works with static data,
              replace it with a normal select like below. */}
          <div>
            <label htmlFor="job-select">Choose a job:</label>
            <select
              id="job-select"
              value={job ?? ""}
              onChange={(e) => setJob(e.target.value || null)}
            >
              <option value="">Select a job</option>
              {jobs.map((jobItem) => (
                <option key={jobItem.id ?? jobItem.url} value={jobItem.job_title}>
                  {jobItem.job_title}
                </option>
              ))}
            </select>
          </div>

          {job && <h2>{job}</h2>}

          {selectedJobData && (
            <div>
              <h3>Company</h3>
              <p>{selectedJobData.company ?? "N/A"}</p>

              <h3>Location</h3>
              <p>{selectedJobData.location ?? "N/A"}</p>

              <h3>Date Posted</h3>
              <p>{selectedJobData.date_posted ?? "N/A"}</p>

              <h3>Seniority</h3>
              <p>{selectedJobData.seniority ?? "N/A"}</p>

              <h3>Remote</h3>
              <p>{selectedJobData.remote ? "Yes" : "No"}</p>

              <h3>Hybrid</h3>
              <p>{selectedJobData.hybrid ? "Yes" : "No"}</p>

              <h3>Employment Statuses</h3>
              <ul>
                {selectedJobData.employment_statuses?.length ? (
                  selectedJobData.employment_statuses.map((status, i) => (
                    <li key={i}>{status}</li>
                  ))
                ) : (
                  <li>N/A</li>
                )}
              </ul>

              <h3>Description</h3>
              <p>{selectedJobData.description ?? "No description available."}</p>

              <h3>Job Link</h3>
              <a
                href={selectedJobData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Job Posting
              </a>

              <h3>Skills</h3>
              <p>No skills data is currently coming from the database.</p>

              <h3>Certifications</h3>
              <p>No certification data is currently coming from the database.</p>

              <h3>Courses</h3>
              <p>No course data is currently coming from the database.</p>

              <h3>Projects</h3>
              <p>No project recommendations available yet.</p>

              <JobGoal onSave={handleSaveGoal} />

              <div>
                <h2>Saved Goals</h2>
                <ul>
                  {goals.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}