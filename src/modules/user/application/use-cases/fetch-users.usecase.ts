import { UserRepository } from '@modules/user/domain/user.repository.interface';
import { UserIdeDto } from '../dto/get-Profile.users.dto';
import { UserEntity } from '@modules/user/domain/user.entity';
import { UserNotFoundError } from '@shared/errors';
import { UserDto } from '../dto/user-response.dto';
import { GetUsersDTO } from '../dto/get-users.dto';

export class FetchUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: GetUsersDTO): Promise<{
    data: any;
    meta: {
      totalPages: number;
      total: number;
      page: number;
      limit: number;
    };
  }> {
    const { data, total, page, limit } = await this.userRepo.findAll({
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
      role: dto.role,
      isBlocked: dto.isBlocked,
    });
    const toResponse = data.map(user => user.toResponse());

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: toResponse,
    };
  }
}
