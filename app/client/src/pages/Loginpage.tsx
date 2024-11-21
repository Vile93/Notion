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
    const onSubmit = (data: ILoginForm) => {
        console.log(data);
    };
    return (
        <div className="flex flex-col items-center mt-16">
            <h1 className="text-2xl font-bold">Log in</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-56 gap-4 mt-4"
            >
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
