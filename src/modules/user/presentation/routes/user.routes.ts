import { Router } from "express";
import { userRegisterCtrl } from "../controllers/user.controller";

const userRouter = Router();

/**
 * Auth / Register
 * POST /api/v1/users/register
 */
userRouter.post("/register", userRegisterCtrl);

export default userRouter;