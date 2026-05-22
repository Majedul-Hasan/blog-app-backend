import { z } from 'zod';

import { VerifyEmailDtoSchema } from '@modules/auth/application/dto/verify-email.dto';

export const verifyEmailValidationSchema = z.object({
  body: VerifyEmailDtoSchema,
});
