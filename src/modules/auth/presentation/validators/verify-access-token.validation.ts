import { z } from 'zod';

import { VerifyAccessTokenDtoSchema } from '@modules/auth/application/dto/verify-access-token.dto';

export const verifyAccessTokenValidationSchema = z.object({
  body: VerifyAccessTokenDtoSchema,
});
