import { UserRepository } from "@modules/user/domain/user.repository.interface";
import { RegisterUserDTO } from "../dto/register-user.dto";
import { UserEntity } from "@modules/user/domain/user.entity";
import { PasswordHasher } from "@shared/security/password-hasher.interface";
import { BcryptPasswordHasher } from "@shared/security/bcrypt-password-hasher";

export class RegisterUserUseCase {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly hasher: PasswordHasher
    ) { }

    async execute(dto: RegisterUserDTO) {
        const existing = await this.userRepo.findByEmail(dto.email);
        console.log({ existing })

        if (existing) throw new Error("user already exists");

        const passwordHash = await this.hasher.hash(dto.password);
        console.log("passwordHash", passwordHash)

        const user = UserEntity.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: passwordHash,
            role: "Guest",
        });
        console.log(29, user)
        return await this.userRepo.save(user);


    }
}