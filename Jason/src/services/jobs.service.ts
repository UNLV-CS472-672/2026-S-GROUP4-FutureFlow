import pool from "../config/db";

export type Job = {
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

export async function getAllJobs(): Promise<Job[]> {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query(`
      SELECT
        id,
        job_title,
        url,
        date_posted,
        company,
        location,
        remote,
        hybrid,
        employment_statuses,
        description,
        seniority
      FROM jobs
      ORDER BY date_posted DESC
    `);

    return rows.map((row: any) => ({
      id: row.id,
      job_title: row.job_title,
      url: row.url,
      date_posted: row.date_posted
        ? new Date(row.date_posted).toISOString()
        : null,
      company: row.company ?? null,
      location: row.location ?? null,
      remote: Boolean(row.remote),
      hybrid: Boolean(row.hybrid),
      employment_statuses:
        typeof row.employment_statuses === "string"
          ? JSON.parse(row.employment_statuses)
          : Array.isArray(row.employment_statuses)
            ? row.employment_statuses
            : [],
      description: row.description ?? null,
      seniority: row.seniority ?? null
    }));
  } finally {
    if (conn) conn.release();
  }
}