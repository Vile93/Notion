import { Link } from 'react-router-dom';
import { fetchUser } from '../services/user.service';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import { NETWORK_ERROR } from '../constants';
import Errorpage from '../components/Errorpage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/userReducer/userSelectors';
import { USER_ACTIONS } from '../store/userReducer/userActions';

const Aboutpage = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const userFetch = useFetch(true, USER_ACTIONS.AUTH, USER_ACTIONS.UNAUTH);
    useEffect(() => {
        if (!user.data) {
            userFetch.fetchData(fetchUser);
        }
    }, []);
    useEffect(() => {
        if (!user.data && userFetch.data && !userFetch.data?.token) {
            dispatch({ type: USER_ACTIONS.SET_DATA, payload: userFetch.data });
            console.log(userFetch.data);
        }
    }, [userFetch.data]);
    if (
        userFetch.error.status === true &&
        userFetch.error.message === NETWORK_ERROR
    ) {
        return (
            <Errorpage
                status={'500'}
                title="Internal Server Error."
                text="We are already working to solve the problem."
            />
        );
    }
    if (userFetch.isLoading) {
        return <Loader />;
    }
    console.log(user);
    return (
        <div>
            <h1 className="title text-center">About me</h1>
            <div className="mt-8 flex flex-col gap-1">
                <div className="font-medium">
                    Username:{' '}
                    <span className="text-gray-400">{user.data?.username}</span>
                </div>
                <div className="font-medium">
                    Email:{' '}
                    <span className="link">
                        <a href={`mailto:${user?.data?.email}`}>
                            {user?.data?.email}
                        </a>
                    </span>
                </div>
                {user.data?.createdAt ? (
                    <div className="font-medium">
                        Date sign up:{' '}
                        <span className="text-gray-400">
                            {formatDate(new Date(user.data?.createdAt))}
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
