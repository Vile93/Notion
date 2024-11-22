import { IUserLogin } from '../interfaces/IUserLogin';
import { IUserRegister } from '../interfaces/IUserRegister';

export const getJWT = () => {
    return fetch(import.meta.env.VITE_API + '/auth/jwt', {
        method: 'POST',
        credentials: 'include',
    }).then((res) => res.json());
};

export const registerUser = (user: IUserRegister) => {
    return fetch(import.meta.env.VITE_API + '/auth/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
        credentials: 'include',
    }).then((res) => res.json());
};

export const loginUser = (user: IUserLogin) => {
    return fetch(import.meta.env.VITE_API + '/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
    }).then((res) => res.json());
};
