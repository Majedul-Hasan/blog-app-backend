import bcrypt from "bcryptjs";
import { PasswordHasher } from "./password-hasher.interface";

export class BcryptPasswordHasher implements PasswordHasher {
    constructor(private readonly rounds: number = 10) { }

    async hash(plain: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rounds);

        return bcrypt.hash(plain, salt);
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        const xxx = await this.hash(plain)
        console.log(plain, hash, xxx)
        return bcrypt.compare(plain, hash);
    }
}
