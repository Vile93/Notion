import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import { IJwtPayload } from '../interfaces/IJwtPayload';
import { TokenService } from '../services/tokenService';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            errorHandler(res, 401, 'Unauthorized');
            return;
        }
        const accessTokenPayload = TokenService.validateAccessToken(
            token
        ) as IJwtPayload;
        if (!accessTokenPayload) {
            errorHandler(res, 401, 'Unauthorized');
            return;
        }

        req.body.token = token;
        req.body.userId = accessTokenPayload.userId;
        next();
    } catch {
        errorHandler(res, 401, 'Unauthorized');
    }
};
