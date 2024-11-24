import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { errorHandler } from '../utils/errorHandler';

const Note = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: 'The task title must not be empty.' }),
    text: z.string(),
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
        errorHandler(res);
    }
};
