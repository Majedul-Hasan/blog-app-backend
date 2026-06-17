import config from '@shared/config/env.const';

import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';
/**
 * controller
 */

import { userRepo } from '@infra/providers/auth.provider';
import { UserController } from './user-controller.class';
import { FetchAnUserUseCase } from '@modules/user/application/use-cases/fetch-user.usecase';
import { FetchUsersUseCase } from '@modules/user/application/use-cases/fetch-users.usecase';

/**
 * repository
 */

const fetchAnUserUseCase = new FetchAnUserUseCase(userRepo);
const fetchUsersUseCase = new FetchUsersUseCase(userRepo);

export const userController = new UserController(fetchAnUserUseCase, fetchUsersUseCase);
