import { z } from 'zod';

export const UserSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must contain at least 3 characters.' }),
    password: z
        .string()
        .min(8, { message: 'The password must contain at least 8 characters.' })
        .refine((password) => /[A-Z]/.test(password), {
            message: 'The password must contain at least one capital letter.',
        })
        .refine((password) => /[a-z]/.test(password), {
            message: 'The password must contain at least one lowercase letter.',
        })
        .refine((password) => /[0-9]/.test(password), {
            message: 'The password must contain at least one number.',
        }),
    email: z.string().email(),
});
