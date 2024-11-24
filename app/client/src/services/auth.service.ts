import { IUserLogin } from '../interfaces/IUserLogin';
import { IUserRegister } from '../interfaces/IUserRegister';
import { axiosInstance } from './main.service';

export const createJWT = () => {
    return axiosInstance.post('/auth/jwt');
};

export const registerUser = (user: IUserRegister) => {
    return axiosInstance.post('/auth/register', {
        email: user.email,
        password: user.password,
        username: user.username,
    });
};

export const loginUser = (user: IUserLogin) => {
    return axiosInstance.post('/auth/login', {
        ...user,
    });
};

export const logoutUser = () => {
    return axiosInstance.post('/auth/logout');
};
