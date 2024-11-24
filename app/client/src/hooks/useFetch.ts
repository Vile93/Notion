import { useState } from 'react';
import { createJWT } from '../services/auth.service';
import { saveJWT } from '../utils/saveJWT';
import axios from 'axios';

const useFetch = <T extends any[]>(
    isVerification: boolean,
    setAuth?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState({
        status: false,
        message: '',
    });
    const errorHandler = (err: Error) => {
        if (axios.isAxiosError(err)) {
            if (err?.status === 401) {
                if (setAuth) setAuth(false);
            }
            setError({
                status: true,
                message: err.response?.data?.message,
            });
        }
    };
    const fetchJWT = async () => {
        const jwt = await createJWT();
        console.log('jwt', jwt);

        try {
            saveJWT(jwt?.data?.token);
            if (setAuth) setAuth(true);
        } catch (err) {
            errorHandler(err as Error);
        }
    };
    const fetchData = async (cb: (...args: T) => any, ...args: T) => {
        setIsLoading(true);
        setIsCompleted(false);
        setError({
            status: false,
            message: '',
        });
        let res = null;
        if (!isVerification) {
            try {
                res = await cb(...args);
                if (res.data?.token && setAuth) {
                    setAuth(true);
                }
            } catch (err) {
                errorHandler(err as Error);
            }
        } else {
            try {
                await fetchJWT();
                res = await cb(...args);
                if (setAuth) setAuth(true);
            } catch (err) {
                errorHandler(err as Error);
            }
        }
        setData(res?.data);
        setIsLoading(false);
        setIsCompleted(true);
    };

    return {
        isCompleted,
        data,
        error,
        isLoading,
        fetchData,
        mutateData: setData,
    };
};

export default useFetch;
