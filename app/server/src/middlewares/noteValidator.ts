import { NextFunction, Request, Response, text } from "express";
import { z } from "zod";

const Note = z.object({
    title: z.string().min(1),
    text: z.string().min(1),
});

export const noteValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, text } = req.body;
        Note.parse({ title, text });
        next();
    } catch (e) {
        res.status(400).json(e);
    }
};
