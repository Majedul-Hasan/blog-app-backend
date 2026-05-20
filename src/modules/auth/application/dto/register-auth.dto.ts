import { z } from "zod";

export const RegisterAuthDtoSchema = z.object({
    firstName: z.string().min(1, "firstName is required").max(50),
    lastName: z.string().min(1, "lastName is required").max(50),
    email: z.string().email("Invalid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export type RegisterAuthDTO = z.infer<typeof RegisterAuthDtoSchema>;

export const parseRegisterAuthDTO = (input: unknown): RegisterAuthDTO => {
    return RegisterAuthDtoSchema.parse(input);
};