import { z } from 'zod';
import { passwordSchema } from './auth-schema';
import { ERROR_MESSAGES } from '@/constants/auth.constants';

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
