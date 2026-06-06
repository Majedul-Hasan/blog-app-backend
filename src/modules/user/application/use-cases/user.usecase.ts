import { UserRepository } from '@modules/user/domain/user.repository.interface';

import { GetUsersDTO } from '../dto/get-users.dto';
import { NotFoundError } from '@shared/errors';

export class UserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async getUsers(dto: GetUsersDTO) {
    return this.userRepo.findAll(dto);
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
}
