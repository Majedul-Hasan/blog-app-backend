import { z } from 'zod';

import { ResetPasswordAuthDtoSchema } from '@modules/auth/application/dto/reset-password.dto';

export const resetPasswordValidationSchema = z.object({
  body: ResetPasswordAuthDtoSchema,
});
