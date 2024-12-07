import { useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import { logoutUser } from '../../../services/auth.service';
import { USER_ACTIONS } from '../../../store/userReducer/userActions';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const logoutFetch = useFetch(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (logoutFetch.isCompleted && logoutFetch.error.status === false) {
            dispatch({ type: USER_ACTIONS.CLEAR_USER_DATA });
            localStorage.clear();
        }
    }, [dispatch, logoutFetch.error.status, logoutFetch.isCompleted]);
    return (
        <a
            className="link cursor-pointer"
            onClick={() => logoutFetch.fetchData(logoutUser)}
        >
            Logout
        </a>
    );
};

export default Logout;
