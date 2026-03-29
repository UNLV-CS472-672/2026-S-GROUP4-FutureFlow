import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/jobs", jobsRouter);

export default app;