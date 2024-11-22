import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PLACEHOLDRS, UserLoginSchema } from '../constants';
import CustomInput from '../components/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserLogin } from '../interfaces/IUserLogin';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loginUser } from '../services/auth.service';
import { saveJWT } from '../utils/saveJWT';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
    const navigate = useNavigate();
    const [enabled, setEnabled] = useState(false);
    const [candidate, setCandidate] = useState<IUserLogin>({
        password: '',
        email: '',
    });
    const { data, isSuccess } = useQuery({
        queryKey: ['register'],
        queryFn: () => {
            setEnabled(false);
            return loginUser(candidate);
        },
        enabled,
    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(UserLoginSchema),
    });

    const onSubmit = (data: IUserLogin) => {
        setEnabled(true);
        setCandidate(data);
    };

    if (isSuccess) {
        const { token } = data;
        if (!token) return;
        saveJWT(data.token);
        navigate('/');
    }
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
            </form>
        </div>
    );
};

export default Loginpage;
