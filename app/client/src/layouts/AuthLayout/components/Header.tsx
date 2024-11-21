import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="flex gap-4 py-2 border-b-2 justify-end">
                <NavLink to={'/auth/register'}>Register</NavLink>
                <NavLink to={'/auth/login'}>Login</NavLink>
            </nav>
        </header>
    );
};

export default Header;
