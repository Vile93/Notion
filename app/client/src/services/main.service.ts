import axios from 'axios';
import { fetchHeaders } from '../utils/fetchHeaders';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const headers = fetchHeaders();
    Object.entries(headers).forEach(([key, value]) => {
        config.headers.set(key, value);
    });
    return config;
});
