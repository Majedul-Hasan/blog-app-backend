import { z } from "zod";

export const ResetPasswordAuthDtoSchema = z.object({
    token: z.string().min(16),
    newPassword: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export type ResetPasswordAuthDto = z.infer<typeof ResetPasswordAuthDtoSchema>;

export const parseResetPasswordAuthDto = (input: unknown): ResetPasswordAuthDto => {
    return ResetPasswordAuthDtoSchema.parse(input);
};