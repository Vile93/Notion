import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="flex gap-4 py-2 border-b-2 justify-end">
                <NavLink to={'/user/about'}>About</NavLink>
                <NavLink to={'/user/notes'}>Notes</NavLink>
                <NavLink to={'/auth/login'}>Logout</NavLink>
            </nav>
        </header>
    );
};

export default Header;
