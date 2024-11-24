import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { userValidator } from '../middlewares/userValidator';

export const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', userValidator, AuthController.register);
authRouter.post('/jwt', AuthController.jwt);
authRouter.post('/logout', AuthController.logout);
