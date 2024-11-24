import { Link } from 'react-router-dom';
import { fetchUser } from '../services/user.service';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

const Aboutpage = () => {
    const user = useContext(UserContext);
    const userData = useFetch(true, !!user?.isAuth);
    useEffect(() => {
        if (user?.setIsAuth && !userData.isAuth) {
            user.setIsAuth(false);
        }
    }, [user, userData.isAuth]);
    useEffect(() => {
        userData.fetchData(fetchUser);
    }, []);
    if (userData.isLoading) {
        return <Loader />;
    }
    if (user?.setUser && userData.isCompleted) {
        user.setUser(userData.data);
        if (userData.data?.username)
            localStorage.setItem('username', userData.data?.username);
    }

    return (
        <div>
            <h1 className="title text-center">About me</h1>
            <div className="mt-8 flex flex-col gap-1">
                <div className="font-medium">
                    Username:{' '}
                    <span className="text-gray-400">
                        {userData?.data?.username}
                    </span>
                </div>
                <div className="font-medium">
                    Email:{' '}
                    <span className="link">
                        <a href={`mailto:${userData?.data?.email}`}>
                            {userData?.data?.email}
                        </a>
                    </span>
                </div>
                <div className="font-medium">
                    Date sign up:{' '}
                    <span className="text-gray-400">
                        {formatDate(new Date(userData?.data?.createdAt))}
                    </span>
                </div>
            </div>
            <div className="text-center mt-8">
                <Link to={'/user/notes'} className="link text-2xl px-4">
                    Go to notes
                </Link>
            </div>
        </div>
    );
};

export default Aboutpage;
