const API_URL = import.meta.env.VITE_API_URL;

export interface Job {
  job_id: number;
  job_title: string;
  company: string;
  job_location: string | null;
  job_type: string;
  pay: number;
  duration: string | null;
  job_description: string | null;
  link: string | null;
  extracted_skills: string[] | null;
}

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
}