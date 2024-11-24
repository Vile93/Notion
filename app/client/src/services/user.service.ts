import { axiosInstance } from './main.service';

export const fetchUser = () => {
    return axiosInstance.get('/users');
};
