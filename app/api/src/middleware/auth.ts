import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer "
    // Bearer is a common scheme for transmitting JWT tokens in the Authorization header
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    try {
        const payload = jwt.verify( 
            token, 
            process.env.JWT_SECRET || "dev-secret" // In production, use a secure secret and store it in environment variables
        ) as { userID: string; email: string }; // Define the expected payload structure for TypeScript

        next(); // If the token is valid, proceed to the next middleware or route handler

    } catch { 
        return res.status(401).json({ message: "Invalid Token" }); // If token verification fails, respond with 401 Unauthorized
    }
}