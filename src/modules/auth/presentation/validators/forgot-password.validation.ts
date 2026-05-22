import { z } from "zod";

import {
    ForgotPasswordAuthDtoSchema,
} from "@modules/auth/application/dto/forgot-password.dto";

export const forgotPasswordValidationSchema =
    z.object({
        body: ForgotPasswordAuthDtoSchema,
    });