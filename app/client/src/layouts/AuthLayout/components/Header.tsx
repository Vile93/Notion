import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="mb-16 header">
            <nav className="header-nav">
                <NavLink to={'/auth/register'}>Register</NavLink>
                <NavLink to={'/auth/login'}>Login</NavLink>
            </nav>
        </header>
    );
};

export default Header;
