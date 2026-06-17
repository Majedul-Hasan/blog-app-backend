import { z } from 'zod';

import { GetUsersDtoSchema } from '@modules/user/application/dto/get-users.dto';

export const ParamGetUsersDtoValidationSchema = z.object({
  params: GetUsersDtoSchema,
});
