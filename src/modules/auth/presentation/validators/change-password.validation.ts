import { z } from 'zod';

import { ChangePasswordAuthDtoSchema } from '@modules/auth/application/dto/change-password.dto';

export const changePasswordValidationSchema = z.object({
    body: ChangePasswordAuthDtoSchema,
});
