import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { doubleCsrfProtection, generateCsrfToken } from "../middleware/csrf.js";
import { prisma } from "../lib/db.js";

const router = Router();

/* ------------------ ZOD SCHEMA ------------------ */

const signupSchema = z.object({
    username: z.string().min(3).max(60),
    email: z.string(),
    password: z
        .string()
        .min(2)
        .max(16),
    // .regex(/[A-Z]/) 
    // .regex(/[!@#$%^&*]/),
    role: z.enum(["ADMIN", "USER"]).optional(),
});

/* ------------------ CSRF TOKEN ENDPOINT ------------------ */

router.get("/csrf-token", (req: Request, res: Response) => {
    const token = generateCsrfToken(req, res);
    res.json({ csrfToken: token });
});

/* ------------------ SIGNUP ------------------ */

router.post("/signup", doubleCsrfProtection,
    async (req: Request, res: Response) => {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: parsed!.error!.issues[0]!.message,
            });
        }

        const { username, email, password, role } = parsed.data;

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    role: role ?? "USER",
                },
            });

            const token = jwt.sign(
                { userId: newUser.id, role: newUser.role },
                process.env.TOKEN as string,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "none",
                maxAge: 5 * 60 * 60 * 1000,
            });

            return res.status(201).json({
                message: "Signup successful",
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

/* ------------------ LOGIN ------------------ */

router.post("/login", doubleCsrfProtection,
    async (req: Request, res: Response) => {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.TOKEN as string,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 5 * 60 * 60 * 1000,
            });

            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

/* ------------------ LOGOUT ------------------ */

router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("token");
    res.clearCookie("_csrf");

    res.status(200).json({ message: "Logout successful" });
});

export default router;
