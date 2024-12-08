import { Link } from 'react-router-dom';
import { fetchUser } from '../services/user.service';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { NETWORK_ERROR } from '../constants';
import Errorpage from '../components/Errorpage';

const Aboutpage = () => {
    const user = useContext(UserContext);

    const userData = useFetch(true, user?.setIsAuth);
    useEffect(() => {
        if (!user?.user) {
            userData.fetchData(fetchUser);
        }
    }, []);
    useEffect(() => {
        if (userData.isCompleted) {
            user?.setUser(userData.data);
        }
    }, [userData.isCompleted]);
    if (
        userData.error.status === true &&
        userData.error.message === NETWORK_ERROR
    ) {
        return (
            <Errorpage
                status={'500'}
                title="Internal Server Error."
                text="We are already working to solve the problem."
            />
        );
    }
    if (userData.isLoading) {
        return <Loader />;
    }
    return (
        <div>
            <h1 className="title text-center">About me</h1>
            <div className="mt-8 flex flex-col gap-1">
                <div className="font-medium">
                    Username:{' '}
                    <span className="text-gray-400">
                        {user?.user?.username}
                    </span>
                </div>
                <div className="font-medium">
                    Email:{' '}
                    <span className="link">
                        <a href={`mailto:${userData?.data?.email}`}>
                            {user?.user?.email}
                        </a>
                    </span>
                </div>
                {user?.user?.createdAt ? (
                    <div className="font-medium">
                        Date sign up:{' '}
                        <span className="text-gray-400">
                            {formatDate(new Date(user?.user.createdAt))}
                        </span>
                    </div>
                ) : null}
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
