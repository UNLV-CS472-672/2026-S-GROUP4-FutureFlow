import { Request, Response, NextFunction } from "express";
import { getAllJobs } from "../services/jobs.service"; // Adjust the import path as needed

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