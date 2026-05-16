import { UserRepository } from "@modules/user/domain/user.repository.interface";

import { GetUsersDTO } from "../dto/get-users.dto";


export class UserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async getUsers(dto: GetUsersDTO) {
        return this.userRepo.findAll(dto);
    }

    async getUserById(id: string) {
        const user = await this.userRepo.findById(id);
        if (!user) throw new Error("User not found");
        return user;
    }
}


