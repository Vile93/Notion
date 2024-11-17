import { Request, Response } from 'express';
import { UserModel } from '../models/userSchema';
import { errorHandler } from '../utils/errorHandler';

export const UserController = {
    getUser: async (req: Request, res: Response) => {
        try {
            const candidate = await UserModel.findOne({
                _id: req.body.userId,
            });
            if (!candidate) {
                errorHandler(res, 404, 'User not found');
                return;
            }
            res.status(200).json({
                email: candidate.email,
            });
        } catch (e) {
            errorHandler(res);
        }
    },
};
