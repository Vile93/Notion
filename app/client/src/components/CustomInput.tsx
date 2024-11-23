import { FC } from 'react';
import { Input } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface ICustomInputProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    className?: string;
    type?: string;
}

const CustomInput: FC<ICustomInputProps> = ({
    control,
    placeholder,
    name,
    className,
    type,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div>
                    <Input
                        type={type ?? 'text'}
                        color={
                            fieldState?.error?.message && fieldState.isTouched
                                ? 'error'
                                : 'primary'
                        }
                        placeholder={placeholder ?? ''}
                        className={className ?? ''}
                        {...field}
                    />
                    {(fieldState?.error?.message && fieldState?.isTouched) ||
                    fieldState.invalid ? (
                        <div className="error">
                            {fieldState?.error?.message}
                        </div>
                    ) : null}
                </div>
            )}
        />
    );
};

export default CustomInput;
