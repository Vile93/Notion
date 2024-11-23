import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { getJWT } from '../../../services/auth.service';
import { fetchUser } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import Logout from './Logout';
const Header = () => {
    const { data: userData }: { data: IUser | any } = useQuery({
        queryKey: ['user', getJWT],
        queryFn: fetchUser,
        enabled: false,
    });

    return (
        <header className="mb-16 flex justify-between items-center header">
            <div>
                Hello, <span className="font-bold">{userData?.username}</span>
            </div>
            <nav className="header-nav">
                <NavLink to={'/user/about'}>About</NavLink>
                <NavLink to={'/user/notes'}>Notes</NavLink>
                <Logout />
            </nav>
        </header>
    );
};

export default Header;
