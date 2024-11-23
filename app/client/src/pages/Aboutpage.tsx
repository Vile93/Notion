import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchUser } from '../services/user.service';
import { getJWT } from '../services/auth.service';
import { IUser } from '../interfaces/IUser';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';

const Aboutpage = () => {
    const { data: JWT, isLoading: JWTLoading } = useQuery({
        queryKey: ['jwt'],
        queryFn: getJWT,
    });
    const {
        data: userData,
        isLoading: userLoading,
    }: { data: IUser | any; isLoading: boolean } = useQuery({
        queryKey: ['user', getJWT],
        queryFn: fetchUser,
        enabled: !!JWT,
        refetchOnWindowFocus: false,
    });
    console.log(JWT, userData);
    if (JWTLoading || userLoading) {
        return <Loader />;
    }
    return (
        <div>
            <h1 className="title text-center">About me</h1>
            <div className="mt-8 flex flex-col gap-1">
                <div className="font-medium">
                    Username:{' '}
                    <span className="text-gray-400">{userData.username}</span>
                </div>
                <div className="font-medium">
                    Email:{' '}
                    <span className="link">
                        <a href={`mailto:${userData.email}`}>
                            {userData.email}
                        </a>
                    </span>
                </div>
                <div className="font-medium">
                    Date sign up:{' '}
                    <span className="text-gray-400">
                        {formatDate(new Date(userData.createdAt))}
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
