import { Button } from '@mui/material';
import { PLACEHOLDRS, UserRegisterSchema } from '../constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../components/CustomInput';
import { IUserRegister } from '../interfaces/IUserRegister';
import { registerUser } from '../services/auth.service';
import { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../contexts/UserContext';

const Registerpage = () => {
    const user = useContext(UserContext);
    const authFetch = useFetch(false, user?.setIsAuth);
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
        },
        mode: 'onChange',
    });
    const onSubmit = async (data: IUserRegister) => {
        authFetch.fetchData(registerUser, { ...data });
    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="title">Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <CustomInput
                    control={control}
                    placeholder={PLACEHOLDRS.USERNAME}
                    name={'username'}
                    className="w-full"
                />
                <CustomInput
                    control={control}
                    placeholder={PLACEHOLDRS.EMAIL}
                    name={'email'}
                    className="w-full"
                />
                <CustomInput
                    type="password"
                    control={control}
                    placeholder={PLACEHOLDRS.PASSWORD}
                    name={'password'}
                    className="w-full"
                />
                <CustomInput
                    type="password"
                    control={control}
                    placeholder={PLACEHOLDRS.REPEAT_PASSWORD}
                    name={'repeatPassword'}
                    className="w-full"
                />
                <Button type="submit">Sign up</Button>
                {authFetch?.error?.message ? (
                    <div className="error">{authFetch?.error?.message}</div>
                ) : null}
            </form>
        </div>
    );
};

export default Registerpage;
