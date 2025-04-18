import { z } from 'zod';

import { ERROR_MESSAGES } from '@/constants/auth.constants';

import { passwordSchema } from './auth-schema';

// 비밀번호 스키마 정의
export const changePasswordSchema = z
  .object({
    password: z.string(),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.password !== '', {
    message: ERROR_MESSAGES.REQUIRED_PASSWORD,
    path: ['password'],
  });
