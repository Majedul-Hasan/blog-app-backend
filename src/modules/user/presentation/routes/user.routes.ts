import { Router } from "express";
import { loginUserCtrl, userRegisterCtrl } from "../controllers/user.controller";

const userRouter = Router();

/**
 * Auth / Register
 * POST /api/v1/users/register
 */
userRouter.post("/register", userRegisterCtrl);
userRouter.post("/login", loginUserCtrl);

export default userRouter;