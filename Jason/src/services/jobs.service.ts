type Job = {
  id: string;
  job_title: string;
  job_description: string;
  job_salary: number | null;
  job_skills: string[];
  location?: string;
  company_name?: string;
};

const jobs: Job[] = [
  {
    id: "1",
    job_title: "Software Engineer Intern",
    job_description: "Assist with building backend services.",
    job_salary: 30000,
    job_skills: ["JavaScript", "Node.js", "SQL"],
    location: "Las Vegas, NV",
    company_name: "Acme Corp"
  },
  {
    id: "2",
    job_title: "Data Analyst",
    job_description: "Analyze business data and build reports.",
    job_salary: 60000,
    job_skills: ["Python", "SQL", "Excel"],
    location: "Remote",
    company_name: "Insight Labs"
  }
];

type FindAllJobsOptions = {
  keyword?: string;
  location?: string;
  page: number;
  limit: number;
};

export async function findAllJobs(options: FindAllJobsOptions) {
  const { keyword, location, page, limit } = options;

  let filtered = [...jobs];

  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.job_title.toLowerCase().includes(lowerKeyword) ||
        job.job_description.toLowerCase().includes(lowerKeyword)
    );
  }

  if (location) {
    const lowerLocation = location.toLowerCase();
    filtered = filtered.filter((job) =>
      (job.location ?? "").toLowerCase().includes(lowerLocation)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function findJobById(jobId: string) {
  return jobs.find((job) => job.id === jobId) ?? null;
}