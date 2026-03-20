import { z } from 'zod';

export const UserSchema = z.object({
    _id: z.string(),
    fullName: z.string().min(3).max(100),
    email: z.email(),
    username: z.string().min(3).max(20),
    avatarUrl: z.url().optional(),
    createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
