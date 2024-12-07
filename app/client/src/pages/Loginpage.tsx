import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PLACEHOLDRS, UserLoginSchema } from '../constants';
import CustomInput from '../components/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserLogin } from '../interfaces/IUserLogin';
import { loginUser } from '../services/auth.service';
import useFetch from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { USER_ACTIONS } from '../store/userReducer/userActions';
import { saveJWT } from '../utils/saveJWT';
import { useEffect } from 'react';

const Loginpage = () => {
    const authFetch = useFetch(false);
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onChange',
        resolver: zodResolver(UserLoginSchema),
    });
    useEffect(() => {
        if (authFetch.isAuth) {
            saveJWT(authFetch.data?.token);
            dispatch({
                type: USER_ACTIONS.AUTH,
            });
        }
    }, [authFetch]);

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
