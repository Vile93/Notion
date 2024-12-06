import { UserSchema } from '../../shared/src/Schemes/UserSchema';
import { z } from 'zod';

// eslint-disable-next-line react-refresh/only-export-components
export const PLACEHOLDRS = {
    USERNAME: 'Username',
    EMAIL: 'Email',
    PASSWORD: 'Passowrd',
    REPEAT_PASSWORD: 'Repeat password',
    NOTE_TITLE: 'Note title',
    NOTE_TEXT: 'Note text',
};

export const UserRegisterSchema = UserSchema.extend({
    repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match.',
    path: ['repeatPassword'],
});

export const UserLoginSchema = UserSchema.pick({
    email: true,
    password: true,
});

export const NETWORK_ERROR = 'Network Error';
