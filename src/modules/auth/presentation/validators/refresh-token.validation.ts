import { z } from 'zod';

import { RefreshTokenDtoSchema } from '@modules/auth/application/dto/refresh-token.dto';

export const refreshTokenValidationSchema = z.object({
    body: RefreshTokenDtoSchema,
});
