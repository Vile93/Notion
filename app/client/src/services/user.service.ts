import { fetchOptions } from '../utils/fetchOptions';

export const fetchUser = () => {
    return fetch(import.meta.env.VITE_API + '/users', {
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};
