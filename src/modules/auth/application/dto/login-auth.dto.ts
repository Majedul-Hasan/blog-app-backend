import { z } from "zod";

export const LoginAuthDtoSchema = z.object({
    email: z.string().email("Invalid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export type LoginAuthDto = z.infer<typeof LoginAuthDtoSchema>;

export const parseLoginAuthDTO = (input: unknown): LoginAuthDto => {
    return LoginAuthDtoSchema.parse(input);
};