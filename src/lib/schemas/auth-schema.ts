import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .regex(/[0-9]/, {
      message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
    })
    .regex(/[^A-Za-z0-9]/, {
      message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
    }),
  remember: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요.' })
      .email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, {
        message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, {
        message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
      }),
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해주세요.' })
      .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다' })
      .max(10, { message: '닉네임은 최대 10자까지 가능합니다' }),
    phone: z
      .string()
      .min(1, { message: '휴대폰 번호를 입력해주세요.' })
      .regex(/^010-\d{4}-\d{4}$/, {
        message: '올바른 형식의 휴대폰 번호를 입력해주세요.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, {
        message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
