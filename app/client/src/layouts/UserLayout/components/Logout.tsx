import { useState } from 'react';
import Loader from '../../../components/Loader';
import { logoutUser } from '../../../services/auth.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Logout = () => {
    const [enabled, setEnabled] = useState(false);
    const queryClient = useQueryClient();
    const { isLoading, isSuccess } = useQuery({
        queryKey: ['logout'],
        queryFn: logoutUser,
        refetchOnWindowFocus: false,
        enabled,
    });
    if (isLoading) return <Loader />;
    if (isSuccess) {
        setEnabled(false);
        queryClient.setQueryData(['jwt'], () => ({ token: '' }));
    }
    return (
        <a className="link cursor-pointer" onClick={() => setEnabled(true)}>
            Logout
        </a>
    );
};

export default Logout;
