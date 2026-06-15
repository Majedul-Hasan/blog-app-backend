import { z } from 'zod';
import { UserIdeDtoSchema } from '@modules/user/application/dto/get-Profile.users.dto';

export const ParamUserIdValidationSchema = z.object({
  params: UserIdeDtoSchema,
});
