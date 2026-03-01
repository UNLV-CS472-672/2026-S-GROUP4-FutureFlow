import { Router } from "express";
import { requireAuth } from "../middleware/auth.js"; // Middleware to protect routes and ensure the user is authenticated
export const meRouter = Router();

meRouter.get("/", requireAuth, (req, res) => {
    res.json({
        id: "demo-user-id", // Return a hardcoded user ID for demonstration purposes
        email: "demo@test.com" // Return a hardcoded email for demonstration purposes
    });
});