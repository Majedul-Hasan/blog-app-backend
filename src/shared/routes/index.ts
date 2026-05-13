import userRouter from "@modules/user/presentation/routes/user.routes";
import { Router } from "express";

const router = Router();

const moduleRoutes = [

    {
        path: "/users",
        route: userRouter,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;
