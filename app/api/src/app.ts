/* Express app factory file for backend API 
Express App Factory File: module that exports a function responsible 
for creating, configuring, and returning an instance of an Express app*/

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { healthRouter } from "./routes/health";
import { authRouter } from "./routes/auth"; // not implemented yet
import { meRouter } from "./routes/me"; // not implemented yet
import { errorHandler } from "./middleware/error"; // not implemented yet

export function createApp() {
    const app = express();

    app.use(helmet()); // Security middleware to set various HTTP headers
    app.use(cors({
        origin: "http://localhost:5173", // Allow requests from the frontend development server
        allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers in CORS requests
    })); // Enable CORS for all routes
    app.use(express.json()); // Middleware to parse JSON request bodies

    app.use("/api/health", healthRouter); // Health check endpoint for monitoring server status
    app.use("/api/auth", authRouter); // Authentication routes for user registration and login
    app.use("/me", meRouter); // User profile routes for accessing and updating user information

    app.use(errorHandler); // Global error handling middleware to catch and respond to errors
    return app; // Return the configured Express app instance
}