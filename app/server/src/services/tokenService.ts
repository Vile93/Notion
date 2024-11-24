import { ACCESS_SECRET, REFRESH_SECRET } from '../constants';
import { IJwtPayload } from '../interfaces/IJwtPayload';
import jwt from 'jsonwebtoken';

export const TokenService = {
    createAccessToken: (payload: IJwtPayload) => {
        try {
            const accessToken = jwt.sign(payload, ACCESS_SECRET, {
                expiresIn: '1min',
            });
            return accessToken;
        } catch {
            return null;
        }
    },
    createTokens: (payload: IJwtPayload) => {
        try {
            const accessToken = jwt.sign(payload, ACCESS_SECRET, {
                expiresIn: '1min',
            });
            const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
                expiresIn: '2min',
            });
            return {
                accessToken,
                refreshToken,
            };
        } catch {
            return null;
        }
    },
    validateAccessToken: (token: string) => {
        try {
            return jwt.verify(token, ACCESS_SECRET);
        } catch {
            return null;
        }
    },
    validateRefreshToken: (token: string) => {
        try {
            return jwt.verify(token, REFRESH_SECRET);
        } catch {
            return null;
        }
    },
};
