import { Response } from 'express';

export const errorHandler = (
    res: Response,
    status = 400,
    message = 'Bad request'
) => {
    res.status(status).json({ message });
};
