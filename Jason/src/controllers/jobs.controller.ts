import { Request, Response } from "express";
import { findAllJobs, findJobById } from "../services/jobs.service";

export async function getJobs(req: Request, res: Response) {
  try {
    const keyword = typeof req.query.keyword === "string" ? req.query.keyword : undefined;
    const location = typeof req.query.location === "string" ? req.query.location : undefined;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (Number.isNaN(page) || page < 1) {
      return res.status(400).json({
        error: {
          code: "INVALID_PAGE",
          message: "page must be a positive integer"
        }
      });
    }

    if (Number.isNaN(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({
        error: {
          code: "INVALID_LIMIT",
          message: "limit must be between 1 and 100"
        }
      });
    }

    const result = await findAllJobs({ keyword, location, page, limit });

    return res.status(200).json(result);
  } catch (error) {
    console.error("getJobs error:", error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    });
  }
}

export async function getJobById(req: Request, res: Response) {
  try {
    const { jobId } = req.params;

    const job = await findJobById(jobId);

    if (!job) {
      return res.status(404).json({
        error: {
          code: "JOB_NOT_FOUND",
          message: "Job not found"
        }
      });
    }

    return res.status(200).json({ data: job });
  } catch (error) {
    console.error("getJobById error:", error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
      }
    });
  }
}