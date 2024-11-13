import { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { noteRotuer } from './noteRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/notes', noteRotuer);

export default router;
