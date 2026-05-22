import authRoutes from '@modules/auth/presentation/routes/auth.routes';
import userRoutes from '@modules/user/presentation/routes/user.routes';
import { Router } from 'express';

type ModuleRoute = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: ModuleRoute[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
