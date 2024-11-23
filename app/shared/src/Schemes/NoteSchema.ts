import { z } from 'zod';

export const NoteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: 'The task title must not be empty.' }),
    text: z.string().optional(),
});
