import { z } from "zod";

export const LoginUserDtoSchema = z.object({
    email: z.string().email("Invalid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export type LoginUserDTO = z.infer<typeof LoginUserDtoSchema>;

export const parseLoginUserDTO = (input: unknown): LoginUserDTO => {
    return LoginUserDtoSchema.parse(input);
};