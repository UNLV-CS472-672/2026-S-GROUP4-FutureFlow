export type RemoteType = "remote" | "hybrid" | "onsite" | "unknown";

export type EmploymentType =
  | "internship"
  | "full-time"
  | "part-time"
  | "contract"
  | "unknown";

export type SeniorityLevel =
  | "internship"
  | "entry-level"
  | "associate"
  | "mid-level"
  | "senior"
  | "director"
  | "executive"
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
  seniorityLevel: SeniorityLevel;
  description: string;
  requirements?: string;
  applyUrl: string;
  postedAt?: string;
  salaryString?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  companyLinkedinUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NormalizedJob = Omit<Job, "id">;

export type TheirStackRawJob = {
    id?: number | string;
    job_title?: string;
    title?: string;
    url?: string | null;
    final_url?: string | null;
    source_url?: string | null;
    date_posted?: string | null;
    company_name?: string;
    company?: string;
    location?: string | null;
    short_location?: string | null;
    remote_type?: boolean | null;
    hybrid?: boolean | null;
    employment_status?: string[] | null;
    description?: string | null;
    seniority_level?: string | null;
    salary_string?: string | null;
    salary_min?: number | null;
    salary_max?: number | null;
    salary_currency?: string | null;
    company_object?: {
        linkedin_url?: string | null;
    } | null;
};

function cleanString(value: unknown): string | undefined {
    if (typeof value !== 'string') return undefined;

    const cleaned = value.trim();
    return cleaned.length > 0 ? cleaned : undefined;
}

function normalizeRemoteType(raw: TheirStackRawJob): RemoteType {
    if (raw.remote_type === true) {
        return "remote";
    }

    if (raw.hybrid === true) {
        return "hybrid";
    }

    const location = cleanString(raw.location) ?? cleanString(raw.short_location) ?? "";

    if (location) {
        return "onsite";
    }

    return "unknown";
}

function normalizeEmploymentType(raw: TheirStackRawJob): EmploymentType {
    const status = Array.isArray(raw.employment_status) ? raw.employment_status : [];
    const normalizedStatus = status.map(s => s.toLowerCase().trim());

    if (normalizedStatus.includes("internship") || normalizedStatus.includes("intern") || normalizedStatus.includes("apprenticeship")) {
        return "internship";
    }

    if (normalizedStatus.includes("full-time") || normalizedStatus.includes("full time") || normalizedStatus.includes("full_time")) {
        return "full-time";
    }

    if  (normalizedStatus.includes("part-time") || normalizedStatus.includes("part time") || normalizedStatus.includes("part_time")) {
        return "part-time";
    }

    if (normalizedStatus.includes("contract") || normalizedStatus.includes("contractor")) {
        return "contract";
    }

    return "unknown";
}

function normalizeSeniorityLevel(raw: TheirStackRawJob): SeniorityLevel {
    const seniority = cleanString(raw.seniority_level)?.toLowerCase() ?? "";

    switch (seniority) {
        case "internship":
        case "intern":
            return "internship";

        case "entry-level":
        case "entry level":
        case "junior":
            return "entry-level";

        case "associate":
            return "associate";

        case "mid-level":        
        case "mid level":
            return "mid-level";

        case "senior":
        case "senior-level":
        case "senior level":
            return "senior";

        case "director":
            return "director";

        case "executive":
            return "executive";

        default:
            return "unknown";
    }
}

function pickApplyUrl(raw: TheirStackRawJob): string {
    return (cleanString(raw.final_url)        
        ?? cleanString(raw.url)
        ?? cleanString(raw.source_url)
        ?? "");
}

function validateNormalizedJob(job: NormalizedJob): void {
    if (!job.externalJobId) {
        throw new Error("Missing externalJobId");
    }

    if (!job.title) {
        throw new Error("Missing title");
    }

    if (!job.company) {
        throw new Error("Missing company");
    }

    if (!job.applyUrl) {
        throw new Error("Missing applyUrl");
    }

    if (!job.description) {
        throw new Error("Missing description");
    }
}

export function normalizeJob(raw: TheirStackRawJob): NormalizedJob {
    const now = new Date().toISOString();

    const normalized: NormalizedJob = {
        source: "theirstack",
        externalJobId: String(raw.id ?? ""),
        title: cleanString(raw.job_title) ?? cleanString(raw.title) ?? "N/A",
        company: cleanString(raw.company_name) ?? cleanString(raw.company) ?? "N/A",
        location: cleanString(raw.location) ?? cleanString(raw.short_location) ?? "N/A",
        remoteType: normalizeRemoteType(raw),
        employmentType: normalizeEmploymentType(raw),
        seniorityLevel: normalizeSeniorityLevel(raw),
        description: cleanString(raw.description) ?? "N/A",
        applyUrl: pickApplyUrl(raw),
        postedAt: cleanString(raw.date_posted) ?? undefined,
        salaryString: cleanString(raw.salary_string) ?? undefined,
        salaryMin: raw.salary_min ?? undefined,
        salaryMax: raw.salary_max ?? undefined,
        salaryCurrency: cleanString(raw.salary_currency) ?? undefined,
        companyLinkedinUrl: cleanString(raw.company_object?.linkedin_url) ?? undefined,
        isActive: true,
        createdAt: now,
        updatedAt: now,
    };

    validateNormalizedJob(normalized);

    return normalized;
}