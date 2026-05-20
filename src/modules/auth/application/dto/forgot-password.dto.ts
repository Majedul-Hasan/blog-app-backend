import { z } from "zod";

export const ForgotPasswordAuthDtoSchema = z.object({
    email: z.email("Invalid email").toLowerCase(),
});

export type ForgotPasswordAuthDto = z.infer<typeof ForgotPasswordAuthDtoSchema>;

export const parseForgotPasswordAuthDto = (input: unknown): ForgotPasswordAuthDto => {
    return ForgotPasswordAuthDtoSchema.parse(input);
};