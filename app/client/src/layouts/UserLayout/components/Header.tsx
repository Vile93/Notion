import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
const Header = () => {
    const user = useContext(UserContext);

    return (
        <header className="mb-16 flex justify-between items-center header">
            <div>
                Hello, <span className="font-bold">{user?.user?.username}</span>
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
