import { z } from "zod";

export const RegisterUserDtoSchema = z.object({
    firstName: z.string().min(1, "firstName is required").max(50),
    lastName: z.string().min(1, "lastName is required").max(50),
    email: z.string().email("Invalid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserDtoSchema>;

export const parseRegisterUserDTO = (input: unknown): RegisterUserDTO => {
    return RegisterUserDtoSchema.parse(input);
};