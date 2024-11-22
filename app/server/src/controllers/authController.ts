import { Request, Response } from 'express';
import { UserModel } from '../models/userSchema';
import { errorHandler } from '../utils/errorHandler';
import { TokenService } from '../services/tokenService';
import { BcryptService } from '../services/bcryptService';
import { TokenModel } from '../models/tokenSchema';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export const AuthController = {
    login: async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;
            const candidate = await UserModel.findOne({ email });
            if (!candidate) {
                errorHandler(res, 404, 'User not found');
                return;
            }

            const isCorrectPassword = await BcryptService.validateValues(
                candidate.password,
                password
            );

            if (!isCorrectPassword) {
                errorHandler(res, 400, 'Incorrect password');
                return;
            }
            const tokens = TokenService.createTokens({
                userId: candidate.id,
            });

            if (!tokens) {
                errorHandler(res);
                return;
            }
            const refreshToken = await TokenModel.findOneAndUpdate(
                { userId: candidate.id },
                {
                    token: tokens.refreshToken,
                },
                { new: true }
            );
            if (!refreshToken) {
                errorHandler(res);
                return;
            }
            res.cookie('refreshToken', refreshToken.token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).json({ token: tokens.accessToken });
            return;
        } catch (e) {
            errorHandler(res);
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;
            console.log(password, email);

            const encodedPassword = await BcryptService.createEncryptedValue(
                password
            );

            const user = await UserModel.findOne({ email });
            if (user) {
                errorHandler(res, 400, 'This user already exists');
                return;
            }

            const newUser = await UserModel.create({
                password: encodedPassword,
                email,
            });
            const tokens = TokenService.createTokens({ userId: newUser.id });
            if (!tokens) {
                errorHandler(res);
                return;
            }
            const refreshToken = await TokenModel.create({
                userId: newUser.id,
                token: tokens.refreshToken,
            });

            res.cookie('refreshToken', refreshToken.token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).json({ token: tokens.accessToken });
        } catch (e) {
            console.log(e);

            errorHandler(res);
        }
    },
    jwt: async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                errorHandler(res, 401, 'Unauthorized');
                return;
            }

            const payload = TokenService.validateRefreshToken(
                refreshToken
            ) as IJwtPayload | null;

            if (!payload || !payload?.userId) {
                errorHandler(res, 401, 'Unauthorized');
                return;
            }
            const refreshTokenDB = await TokenModel.findOne({
                userId: payload.userId,
            });

            if (!refreshTokenDB || refreshTokenDB.token !== refreshToken) {
                errorHandler(res, 401, 'Unauthorized');
                return;
            }
            const accessToken = TokenService.createAccessToken({
                userId: payload.userId,
            });
            if (!accessToken) {
                errorHandler(res);
                return;
            }
            res.status(200).json({ token: accessToken });
        } catch (e) {
            errorHandler(res, 401, 'Unauthorized');
        }
    },
};
