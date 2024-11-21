import { Button, Input } from '@mui/material';
import { PLACEHOLDRS } from '../constants';
import { Controller, useForm } from 'react-hook-form';

interface IRegisterForm {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const Registerpage = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
        },
    });
    const onSubmit = (data: IRegisterForm) => {
        console.log(data);
    };
    return (
        <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-2xl font-bold">Sign up</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-32 gap-2 mt-4"
            >
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <Input placeholder={PLACEHOLDRS.USERNAME} {...field} />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input placeholder={PLACEHOLDRS.EMAIL} {...field} />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input placeholder={PLACEHOLDRS.PASSWORD} {...field} />
                    )}
                />
                <Controller
                    name="repeatPassword"
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder={PLACEHOLDRS.REPEAT_PASSWORD}
                            {...field}
                        />
                    )}
                />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
};

export default Registerpage;
