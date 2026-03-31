import { Request, Response, NextFunction } from "express";
import { getAllJobs } from "../services/jobs.service";

export async function getJobsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const jobs = await getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
}