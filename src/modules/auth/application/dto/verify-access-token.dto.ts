import { z } from "zod";

export const VerifyAccessTokenDtoSchema = z.object({
    accessToken: z.string().min(16),

});

export type VerifyAccessTokenDto = z.infer<typeof VerifyAccessTokenDtoSchema>;

export const parseVerifyAccessTokenDto = (input: unknown): VerifyAccessTokenDto => {
    return VerifyAccessTokenDtoSchema.parse(input);
};