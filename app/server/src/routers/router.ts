import { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { noteRotuer } from './noteRouter';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/notes', authMiddleware, noteRotuer);

export default router;
