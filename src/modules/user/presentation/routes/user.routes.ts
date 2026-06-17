import { Router } from 'express';

import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';
import { authenticationService } from '@infra/providers/auth.provider';
import { userController } from '../controllers';
import validateRequest from '@infra/http/express/middlewares/validateRequest';
import { ParamUserIdValidationSchema } from '../validators/Param-Id.validation';
import { ParamGetUsersDtoValidationSchema } from '../validators/getUsers.validation';
import { UserRole } from '@modules/user/domain/types/userRole.types';

const userRouter = Router();
// const auth = new authMiddleware();
/**
 * Auth / Register
 * POST /api/v1/users/register
 */

// userRouter.get('/', authMiddleware(authenticationService), getUsersCtrl);

userRouter
  .route('/:userId')
  .get(validateRequest(ParamUserIdValidationSchema), userController.userById)
  .delete(
    validateRequest(ParamUserIdValidationSchema),
    authMiddleware(authenticationService, UserRole.ADMIN),
    userController.deleteUserById
  );

userRouter.get('/', validateRequest(ParamGetUsersDtoValidationSchema), userController.users);

export default userRouter;
