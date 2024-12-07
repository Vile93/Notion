import { useEffect, useState } from 'react';
import { createJWT } from '../services/auth.service';
import { saveJWT } from '../utils/saveJWT';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const useFetch = (
    isVerification: boolean,
    authSuccessAction?: string,
    authFailAction?: string
) => {
    const dispatch = useDispatch();
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('jwt'));
    const [error, setError] = useState({
        status: false,
        message: '',
    });
    const errorHandler = (err: Error) => {
        if (axios.isAxiosError(err)) {
            if (err?.status === 401) {
                setIsAuth(false);
            }
            setError({
                status: true,
                message: err.response?.data?.message ?? err.message,
            });
        }
    };
    const fetchJWT = async () => {
        const jwt = await createJWT();

        try {
            saveJWT(jwt?.data?.token);
            setIsAuth(true);
        } catch (err) {
            errorHandler(err as Error);
        }
    };
    const fetchData = async <T extends any[]>(
        cb: (...args: T) => any,
        ...args: T
    ) => {
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
                if (res.data?.token) {
                    setIsAuth(true);
                    saveJWT(res.data.token);
                }
            } catch (err) {
                errorHandler(err as Error);
            }
        } else {
            try {
                await fetchJWT();
                res = await cb(...args);
                setIsAuth(true);
            } catch (err) {
                errorHandler(err as Error);
            }
        }
        setData(res?.data);
        setIsLoading(false);
        setIsCompleted(true);
    };
    useEffect(() => {
        if (authSuccessAction && authFailAction) {
            if (isAuth) {
                dispatch({ type: authSuccessAction });
            } else {
                dispatch({ type: authFailAction });
            }
        }
    }, [isAuth]);
    return {
        isCompleted,
        isAuth,
        data,
        error,
        isLoading,
        fetchData,
        mutateData: setData,
    };
};

export default useFetch;
