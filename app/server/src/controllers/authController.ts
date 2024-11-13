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
            if (candidate) {
                const isCorrectPassword = await BcryptService.validateValues(
                    candidate.password,
                    password
                );

                if (isCorrectPassword) {
                    const tokens = TokenService.createTokens({
                        _id: candidate.id,
                    });

                    if (!tokens) {
                        errorHandler(res);
                        return;
                    }
                    const refreshToken = await TokenModel.findOneAndUpdate(
                        { userId: candidate._id },
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
                } else {
                    res.status(400).json({ message: 'Incorrect password' });
                    return;
                }
            } else {
                errorHandler(res, 404, 'User not found');
            }
        } catch (e) {
            errorHandler(res);
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;
            const encodedPassword = await BcryptService.createEncryptedValue(
                password
            );
            const user = await UserModel.findOne({ email });

            if (!user) {
                const newUser = await UserModel.create({
                    password: encodedPassword,
                    email,
                });
                const tokens = TokenService.createTokens({ _id: newUser.id });
                if (!tokens) {
                    errorHandler(res);
                    return;
                }
                const refreshToken = await TokenModel.create({
                    userId: newUser._id,
                    token: tokens.refreshToken,
                });

                res.cookie('refreshToken', refreshToken.token, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });

                res.status(200).json({ token: tokens.accessToken });
            } else {
                errorHandler(res, 400, 'This user already exists');
            }
        } catch {
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

            if (!payload || !payload?._id) {
                errorHandler(res, 401, 'Unauthorized');
                return;
            }
            const refreshTokenDB = await TokenModel.findOne({
                userId: payload._id,
            });

            if (!refreshTokenDB || refreshTokenDB.token !== refreshToken) {
                errorHandler(res, 401, 'Unauthorized');
                return;
            }
            if (payload?._id) {
                const accessToken = TokenService.createAccessToken({
                    _id: payload._id,
                });
                res.status(200).json({ token: accessToken });
            } else {
                errorHandler(res, 401, 'Unauthorized');
            }
        } catch (e) {
            errorHandler(res, 401, 'Unauthorized');
        }
    },
};
