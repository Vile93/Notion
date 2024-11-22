import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="mb-16 flex justify-between items-center header">
            <div>
                Hello, <span className="font-bold">user</span>
            </div>
            <nav className="header-nav">
                <NavLink to={'/user/about'}>About</NavLink>
                <NavLink to={'/user/notes'}>Notes</NavLink>
                <NavLink to={'/auth/login'}>Logout</NavLink>
            </nav>
        </header>
    );
};

export default Header;
