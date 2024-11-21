import { Button, Input } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { PLACEHOLDRS } from '../constants';

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
    });
    console.log(control);

    const onSubmit = (data: ILoginForm) => {
        console.log(data);
    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="title">Log in</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" auth-form">
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
                <Button type="submit">Log in</Button>
            </form>
        </div>
    );
};

export default Loginpage;
