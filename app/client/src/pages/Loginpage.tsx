import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PLACEHOLDRS, UserLoginSchema } from '../constants';
import CustomInput from '../components/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';

interface ILoginForm {
    password: string;
    email: string;
}

const Loginpage = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            email: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(UserLoginSchema),
    });
    console.log(control);

    const onSubmit = (data: ILoginForm) => {
        console.log(data);
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
            </form>
        </div>
    );
};

export default Loginpage;
