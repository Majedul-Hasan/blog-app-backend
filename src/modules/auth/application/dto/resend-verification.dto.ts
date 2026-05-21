import { z } from "zod";

export const ResendVerificationDtoSchema = z.object({
    email: z.email("Invalid email").toLowerCase(),
});

export type ResendVerificationDto = z.infer<typeof ResendVerificationDtoSchema>;

export const parseResendVerificationDto = (input: unknown): ResendVerificationDto => {
    return ResendVerificationDtoSchema.parse(input);
};