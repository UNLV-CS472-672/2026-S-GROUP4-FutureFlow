const API_URL = "https://5w5fhmch6j.execute-api.us-east-1.amazonaws.com/default/getJobs";

export interface Job {
  job_id: number;
  job_title: string;
  company: string;
  job_location: string | null;
  job_type: string;
  pay: number;
  duration: string | null;
}

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
}