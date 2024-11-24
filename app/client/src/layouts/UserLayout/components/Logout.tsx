import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import useFetch from '../../../hooks/useFetch';
import { logoutUser } from '../../../services/auth.service';
import Loader from '../../../components/Loader';
import { clearJWT } from '../../../utils/clearJWT';

const Logout = () => {
    const user = useContext(UserContext);
    const logout = useFetch(false, !!user?.isAuth);
    useEffect(() => {
        if (user?.setIsAuth && logout.isCompleted) {
            clearJWT();
            user.setIsAuth(false);
        }
    }, [logout.isCompleted, user]);
    if (logout.isLoading) return <Loader />;
    return (
        <a
            className="link cursor-pointer"
            onClick={() => logout.fetchData(logoutUser)}
        >
            Logout
        </a>
    );
};

export default Logout;
