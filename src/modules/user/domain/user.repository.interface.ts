import { UserEntity } from './user.entity';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findAll1(): Promise<UserEntity[]>;
  findAll(params: { page: number; limit: number; search?: string; role?: string; isBlocked?: boolean }): Promise<{
    data: UserEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: UserEntity): Promise<UserEntity>;
}
