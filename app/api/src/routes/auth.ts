// replace with prisma and real database in the future, for now we will use a hardcoded user for demonstration purposes

import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // For demonstration purposes, we will use a hardcoded user. 
    // In a real application, you would query your database for the user.
    if (email !== "demo@test.com" || password !== "password123") {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign(
        { userID: "demo-user-id", email }, // Payload containing user information
        process.env.JWT_SECRET || "dev_secret", // Secret key for signing the JWT, should be set in environment variables for production
        { expiresIn: "1h" } // Token expiration time
    );

    res.json({ token }); // Respond with the generated JWT token
});
