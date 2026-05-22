import { z } from 'zod';

import { RegisterAuthDtoSchema } from '@modules/auth/application/dto/register-auth.dto';

export const RegisterAuthValidationSchema = z.object({
    body: RegisterAuthDtoSchema,
});
