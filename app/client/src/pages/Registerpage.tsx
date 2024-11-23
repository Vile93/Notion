import { Button } from '@mui/material';
import { PLACEHOLDRS, UserRegisterSchema } from '../constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../components/CustomInput';
import { IUserRegister } from '../interfaces/IUserRegister';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../services/auth.service';
import { useState } from 'react';
import { saveJWT } from '../utils/saveJWT';

const Registerpage = () => {
    const queryClient = useQueryClient();
    const [enabled, setEnabled] = useState(false);
    const [candidate, setCandidate] = useState<IUserRegister>({
        username: '',
        password: '',
        repeatPassword: '',
        email: '',
    });
    const { data, isSuccess } = useQuery({
        queryKey: ['register'],
        queryFn: () => {
            setEnabled(false);
            return registerUser(candidate);
        },
        enabled,
    });

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
    const onSubmit = (data: IUserRegister) => {
        setEnabled(true);
        setCandidate(data);
    };
    if (isSuccess) {
        const { token } = data;
        if (token) {
            saveJWT(data.token);
            queryClient.setQueryData(['jwt'], () => ({
                token: localStorage.getItem('jwt'),
            }));
        }
    }
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
                {data?.message ? (
                    <div className="error">{data.message}</div>
                ) : null}
            </form>
        </div>
    );
};

export default Registerpage;
