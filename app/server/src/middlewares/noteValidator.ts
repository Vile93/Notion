import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import { NoteSchema } from '../../../shared/src/Schemes/NoteSchema';

export const noteValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, text } = req.body;
        NoteSchema.parse({ title, text });
        next();
    } catch (e) {
        errorHandler(res);
    }
};
