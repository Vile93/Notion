import { IUserLogin } from '../interfaces/IUserLogin';
import { IUserRegister } from '../interfaces/IUserRegister';
import { fetchOptions } from '../utils/fetchOptions';

export const getJWT = () => {
    return fetch(import.meta.env.VITE_API + '/auth/jwt', {
        method: 'POST',
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};

export const registerUser = (user: IUserRegister) => {
    return fetch(import.meta.env.VITE_API + '/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            username: user.username,
        }),
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};

export const loginUser = (user: IUserLogin) => {
    return fetch(import.meta.env.VITE_API + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};

export const logoutUser = () => {
    return fetch(import.meta.env.VITE_API + '/auth/logout', {
        method: 'POST',
    }).then((res) => res.json());
};
