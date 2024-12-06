import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import useFetch from '../../../hooks/useFetch';
import { logoutUser } from '../../../services/auth.service';

const Logout = () => {
    const user = useContext(UserContext);
    const logout = useFetch(false, user?.setIsAuth);
    useEffect(() => {
        if (user?.setIsAuth && logout.isCompleted) {
            user.setIsAuth(false);
            user.setNotes([]);
            user.setUser(null);
            localStorage.clear();
        }
    }, [logout.isCompleted, user]);
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
