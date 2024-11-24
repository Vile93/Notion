import { NextFunction, Request, Response } from 'express';
import { UserSchema } from '../../../shared/src/Schemes/UserSchema';
import { errorHandler } from '../utils/errorHandler';

export const userValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password, username } = req.body;
        UserSchema.parse({ username, password, email });

        next();
    } catch {
        errorHandler(res);
    }
};
