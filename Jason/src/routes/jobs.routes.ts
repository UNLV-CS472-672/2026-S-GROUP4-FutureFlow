import { Router } from "express";
import { getJobs, getJobById } from "../controllers/jobs.controller";

const router = Router();

router.get("/", getJobs);
router.get("/:jobId", getJobById);

export default router;