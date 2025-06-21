import {
  loginUserSchema,
  registerUserSchema,
} from '@user-service/dtos/user.dto';
import { z } from 'zod';

export const registerSchema = z.object({
  body: registerUserSchema,
});

export const loginSchema = z.object({
  body: loginUserSchema,
});
