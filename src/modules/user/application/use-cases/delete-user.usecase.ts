import { UserRepository } from '@modules/user/domain/user.repository.interface';
import { UserIdeDto } from '../dto/get-Profile.users.dto';

import { UserNotFoundError } from '@shared/errors';
import { UserDto } from '../dto/user-response.dto';

export class DeleteAnUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: UserIdeDto): Promise<UserDto> {
    const user = await this.userRepo.findById(dto.userId);

    if (!user) {
      throw new UserNotFoundError();
    }
    return user.toResponse();
  }
}
