import { z } from 'zod';

export const VerifyEmailDtoSchema = z.object({
    token: z.string().min(1, 'Token is required'),
});

export type VerifyEmailDto = z.infer<typeof VerifyEmailDtoSchema>;

export const parseVerifyEmailDto = (input: unknown): VerifyEmailDto => {
    return VerifyEmailDtoSchema.parse(input);
};
