import { z } from "zod";

export const GetUsersDtoSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),

    search: z.string().optional(),
    role: z.enum(["Admin", "Guest", "Blogger"]).optional(),
    isBlocked: z.coerce.boolean().optional(),
});

export type GetUsersDTO = z.infer<typeof GetUsersDtoSchema>;

export const parseGetUsersDTO = (input: unknown): GetUsersDTO => {
    return GetUsersDtoSchema.parse(input);
};