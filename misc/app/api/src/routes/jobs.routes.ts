import { Router } from "express";
import { getJobsController } from "../controllers/jobs.controller";

const router = Router();

router.get("/", getJobsController);

export default router;