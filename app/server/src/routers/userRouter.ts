import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.get("/", authMiddleware, UserController.getUser);
