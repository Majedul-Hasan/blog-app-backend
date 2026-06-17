import { UserRepository } from '../../domain/user.repository.interface';
import UserModel from '../models/user.model';
import { toDomain, toDomainList, toPersistence, toPersistenceCreate } from '../mappers/user.mapper';
import { UserEntity } from '@modules/user/domain/user.entity';

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const doc = await UserModel.findOne({ email });
    return doc ? toDomain(doc) : null;
  }

  async save(user: UserEntity) {
    const data = toPersistenceCreate(user);
    const userCreated = await UserModel.create(data);
    return toDomain(userCreated);
  }
  async update(userId: string, user: UserEntity) {
    const data = toPersistenceCreate(user);
    const userUpdated = await UserModel.findByIdAndUpdate(userId, data);
    return toDomain(userUpdated);
  }

  async findAll1() {
    const docs = await UserModel.find({}).lean();
    return docs.map(doc => toDomain(doc));
  }
  async findAll(params: { page: number; limit: number; search?: string; role?: string; isBlocked?: boolean }): Promise<{
    data: UserEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page, limit, search, role, isBlocked } = params;

    const query: any = {};

    // 🔍 search (firstName, lastName, email)
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) query.role = role;
    if (typeof isBlocked === 'boolean') query.isBlocked = isBlocked;

    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      UserModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),

      UserModel.countDocuments(query),
    ]);

    return {
      data: toDomainList(docs), //docs.map(toDomain),
      total,
      page,
      limit,
    };
  }

  async findById(id: string) {
    const doc = await UserModel.findOne({ _id: id });
    return doc ? toDomain(doc) : null;
  }
  async delete(id: string) {
    const doc = await UserModel.findByIdAndDelete({ _id: id });
    return doc ? toDomain(doc) : null;
  }
}
