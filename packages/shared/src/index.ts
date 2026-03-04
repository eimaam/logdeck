import { z } from 'zod';


export * from './types';
export * from './constants';

// auth schemas
export const LoginSchema = z.object({
  email: z.string().email(),
});

export const RegisterSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;

