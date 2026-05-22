import { z } from 'zod';

import { ResendVerificationDtoSchema } from '@modules/auth/application/dto/resend-verification.dto';

export const resendVerificationValidationSchema = z.object({
  body: ResendVerificationDtoSchema,
});
