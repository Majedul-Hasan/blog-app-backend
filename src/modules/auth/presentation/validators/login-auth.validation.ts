import { z } from 'zod';

import { LoginAuthDtoSchema } from '@modules/auth/application/dto/login-auth.dto';

export const loginAuthValidationSchema = z.object({
    body: LoginAuthDtoSchema,
});
