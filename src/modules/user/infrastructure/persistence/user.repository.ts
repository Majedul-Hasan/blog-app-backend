import { UserRepository } from "../../domain/user.repository.interface";
import UserModel from "../models/user.model";
import { toDomain, toPersistence, toPersistenceCreate } from "../mappers/user.mapper";
import { UserEntity } from "@modules/user/domain/user.entity";

export class MongoUserRepository implements UserRepository {
    async findByEmail(email: string) {
        const doc = await UserModel.findOne({ email });
        return doc ? toDomain(doc) : null;
    }

    async save(user: UserEntity) {
        const data = toPersistenceCreate(user);
        const userCreated = await UserModel.create(data);
        return toDomain(userCreated)
    }
}