import { Router } from "express";
import { loginUserCtrl, userRegisterCtrl, fetchUserByIdCtrl, getUsersCtrl } from "../controllers/user.controller";
import authMiddleWare from "../../../../middlewares/authMiddleware";

const userRouter = Router();

/**
 * Auth / Register
 * POST /api/v1/users/register
 */
userRouter.post("/register", userRegisterCtrl);
userRouter.post("/login", loginUserCtrl);
userRouter.get("/", authMiddleWare, getUsersCtrl);
userRouter.get("/:id", fetchUserByIdCtrl);

export default userRouter;