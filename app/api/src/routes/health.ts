/* 
This file defines the health check route for the backend API, 
which allows clients to verify that the server is running and healthy. 
It uses Express to create a router and defines a GET endpoint that responds 
with a JSON object indicating the health status of the server.
*/

import { Router } from "express"; // Import the Router class from the Express library to create a new router instance for handling health check routes
export const healthRouter = Router(); // Create a new router instance for handling health check routes, which will be used to define endpoints related to checking the health/status of the server

// Define a GET endpoint at the root of the health router (i.e., /api/health) that responds with a JSON object indicating that the server is healthy
healthRouter.get("/", (_req, res) => {
    res.json({ok: true, message: "Server is healthy!"}); // Respond with a JSON object indicating that the server is healthy
});