import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err); // Log the error for debugging purposes

    res.status(500).json({ message: "Internal Server Error" }); // Respond with a generic error message to the client
    // In a real application, we'll provide more specific error messages/handle diff types of errors differently
}