import { z } from 'zod';

import { ERROR_MESSAGES, VALIDATION_RULES } from '@/constants/auth.constants';

import {
  checkEmailExists,
  checkNickNameExists,
  checkPhoneExists,
} from '../apis/auth/auth-server.api';

/**
 * 이메일 유효성 검사를 위한 스키마
 */
const emailSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_EMAIL })
  .email({ message: ERROR_MESSAGES.INVALID_EMAIL });

/**
 * 비밀번호 유효성 검사를 위한 스키마
 */
export const passwordSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_PASSWORD })
  .min(VALIDATION_RULES.PASSWORD.MIN, {
    message: ERROR_MESSAGES.MIN_PASSWORD_LENGTH,
  })
  .regex(VALIDATION_RULES.PASSWORD_REGEX.LETTER, {
    message: ERROR_MESSAGES.PASSWORD_LETTER,
  })
  .regex(VALIDATION_RULES.PASSWORD_REGEX.NUMBER, {
    message: ERROR_MESSAGES.PASSWORD_NUMBER,
  })
  .regex(VALIDATION_RULES.PASSWORD_REGEX.SPECIAL, {
    message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR,
  });

/**
 * 닉네임 유효성 검사를 위한 스키마
 */
export const nicknameSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_NICKNAME })
  .min(VALIDATION_RULES.NICKNAME.MIN, {
    message: ERROR_MESSAGES.MIN_NICKNAME_LENGTH,
  })
  .max(VALIDATION_RULES.NICKNAME.MAX, {
    message: ERROR_MESSAGES.MAX_NICKNAME_LENGTH,
  })
  .refine(
    async (nickname) => {
      const exists = await checkNickNameExists(nickname);
      return !exists;
    },
    { message: ERROR_MESSAGES.NICKNAME_EXISTS },
  );

/**
 * 전화번호 유효성 검사를 위한 스키마
 */
export const phoneSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_PHONE })
  .transform((val) => val.replace(/\D/g, ''))
  .refine((val) => VALIDATION_RULES.PHONE_REGEX.test(val), {
    message: ERROR_MESSAGES.INVALID_PHONE,
  });

/**
 * 로그인 폼 검증 스키마
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_PASSWORD }),
  remember: z.boolean().optional().default(false),
});

/**
 * 회원가입 폼 검증 스키마
 */
export const registerSchema = z
  .object({
    email: emailSchema.refine(
      async (email) => {
        const exists = await checkEmailExists(email);
        return !exists;
      },
      { message: ERROR_MESSAGES.EMAIL_EXISTS },
    ),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: ERROR_MESSAGES.CHECK_REQUIRED_PASSWORD }),
    nickname: nicknameSchema,
    phone: phoneSchema.refine(
      async (phone) => {
        const exists = await checkPhoneExists(phone);
        return !exists;
      },
      { message: ERROR_MESSAGES.PHONE_EXISTS },
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

/**
 * 비밀번호 찾기 폼 검증 스키마
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema.refine(
    async (email) => {
      const exists = await checkEmailExists(email);
      return exists; // 이메일이 존재하면 true 반환
    },
    { message: ERROR_MESSAGES.EMAIL_NOT_REGISTERED_MESSAGE },
  ),
});

/**
 * 비밀번호 재설정 폼 검증 스키마
 */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });
