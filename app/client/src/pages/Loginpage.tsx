import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PLACEHOLDRS, UserLoginSchema } from '../constants';
import CustomInput from '../components/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserLogin } from '../interfaces/IUserLogin';
import { useContext } from 'react';
import { loginUser } from '../services/auth.service';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../contexts/UserContext';

const Loginpage = () => {
    const user = useContext(UserContext);
    const authFetch = useFetch(false, user?.setIsAuth);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onChange',
        resolver: zodResolver(UserLoginSchema),
    });

    const onSubmit = async (data: IUserLogin) => {
        authFetch.fetchData(loginUser, { ...data });
    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="title">Log in</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" auth-form">
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
                <Button type="submit">Log in</Button>
                {authFetch?.error?.message ? (
                    <div className="error">{authFetch?.error?.message}</div>
                ) : null}
            </form>
        </div>
    );
};

export default Loginpage;
