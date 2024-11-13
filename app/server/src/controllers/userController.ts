import { Request, Response } from 'express';
import { UserModel } from '../models/userSchema';
import { errorHandler } from '../utils/errorHandler';

export const UserController = {
    getUser: async (req: Request, res: Response) => {
        try {
            const candidate = await UserModel.findOne({
                _id: req.body.userId,
            });
            if (candidate) {
                res.status(200).json({
                    email: candidate.email,
                });
            } else {
                errorHandler(res, 404, 'User not found');
            }
        } catch (e) {
            errorHandler(res);
        }
    },
};
