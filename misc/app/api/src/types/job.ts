export interface Job {
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
}

export interface JobQuery {
  location?: string;
  remote?: string;
  hybrid?: string;
  seniority?: string;
  company?: string;
}