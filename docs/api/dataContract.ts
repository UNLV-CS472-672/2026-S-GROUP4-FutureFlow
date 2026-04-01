export type RemoteType = "remote" | "hybrid" | "onsite" | "unknown";

export type EmploymentType =
  | "internship"
  | "full-time"
  | "part-time"
  | "contract"
  | "unknown";

export type Job = {
  id: number;

  source: string;
  externalJobId: string;

  title: string;
  company: string;
  location?: string;

  remoteType: RemoteType;
  employmentType: EmploymentType;

  description: string;
  requirements?: string;

  applyUrl: string;
  postedAt?: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};