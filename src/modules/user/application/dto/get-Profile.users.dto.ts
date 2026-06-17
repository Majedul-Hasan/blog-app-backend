import { objectIdSchema } from '@shared/validation/object-id.schema';
import { z } from 'zod';

export const UserIdeDtoSchema = z.object({
  userId: objectIdSchema,
});

export type UserIdeDto = z.infer<typeof UserIdeDtoSchema>;

export const parseUserIdeDto = (input: unknown): UserIdeDto => {
  return UserIdeDtoSchema.parse(input);
};
