import { useState } from 'react';
import { createJWT } from '../services/auth.service';
import { saveJWT } from '../utils/saveJWT';
import { clearJWT } from '../utils/clearJWT';

const useFetch = <T extends any[]>(
    isVerification: boolean,
    wasAuthorized: boolean
) => {
    const [data, setData] = useState<any | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(wasAuthorized);
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const fetchJWT = async () => {
        const jwt = await createJWT();
        console.log(jwt);

        if (!jwt?.token) {
            setIsAuth(false);
            clearJWT();
        } else {
            setIsAuth(true);
            saveJWT(jwt.token);
        }
    };
    const fetchData = async (cb: (...args: T) => any, ...args: T) => {
        setIsLoading(true);
        setIsCompleted(false);
        let res = null;
        if (isVerification) {
            await fetchJWT();
            res = await cb(...args);
        } else {
            res = await cb(...args);
            if (res?.token) {
                setIsAuth(true);
            }
        }
        setData(res);
        setIsLoading(false);
        setIsCompleted(true);
    };

    return {
        isAuth,
        isCompleted,
        data,
        isLoading,
        fetchData,
    };
};

export default useFetch;
