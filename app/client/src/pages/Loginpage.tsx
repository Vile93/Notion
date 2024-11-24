import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PLACEHOLDRS, UserLoginSchema } from '../constants';
import CustomInput from '../components/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserLogin } from '../interfaces/IUserLogin';
import { useContext, useEffect } from 'react';
import { loginUser } from '../services/auth.service';
import { UserContext } from '../App';
import useFetch from '../hooks/useFetch';

const Loginpage = () => {
    const auth = useContext(UserContext);
    const authFetch = useFetch(false, !!auth?.isAuth);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(UserLoginSchema),
    });
    const onSubmit = async (data: IUserLogin) => {
        authFetch.fetchData(loginUser, { ...data });
    };

    useEffect(() => {
        if (auth?.setIsAuth && authFetch.isAuth) {
            auth.setIsAuth(true);
        }
    }, [auth, authFetch.isAuth]);

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
                {authFetch?.data?.message ? (
                    <div className="error">{authFetch.data?.message}</div>
                ) : null}
            </form>
        </div>
    );
};

export default Loginpage;
