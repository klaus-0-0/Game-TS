import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Type for authenticated requests
export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const secret = process.env.TOKEN!;
        const decoded = jwt.verify(token, secret) as { id: string; role: string };
        console.log("decode =", decoded);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
