import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const User = z.object({
    username: z
        .string()
        .min(3, { message: "Username must contain at least 3 characters." }),
    password: z
        .string()
        .min(8, { message: "The password must contain at least 8 characters." })
        .refine((password) => /[A-Z]/.test(password), {
            message: "The password must contain at least one capital letter.",
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "The password must contain at least one lowercase letter.",
        })
        .refine((password) => /[0-9]/.test(password), {
            message: "The password must contain at least one number.",
        }),
    email: z.string().email(),
});

export const userValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password, username } = req.body;
        User.parse({ username, password, email });

        next();
    } catch (e) {
        res.status(400).json(e);
    }
};
