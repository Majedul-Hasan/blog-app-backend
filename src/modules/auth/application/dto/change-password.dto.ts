import { z } from "zod";

export const ChangePasswordAuthDtoSchema =
    z.object({
        currentPassword: z
            .string()
            .min(6)
            .max(128),

        newPassword: z
            .string()
            .min(6)
            .max(128),
    });

export type ChangePasswordAuthDto =
    z.infer<
        typeof ChangePasswordAuthDtoSchema
    >;

export const parseChangePasswordAuthDto = (
    input: unknown
): ChangePasswordAuthDto => {

    return ChangePasswordAuthDtoSchema.parse(
        input
    );
};