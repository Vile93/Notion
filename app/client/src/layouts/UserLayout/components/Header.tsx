import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="mb-16">
            <nav className="header-nav">
                <NavLink to={'/user/about'}>About</NavLink>
                <NavLink to={'/user/notes'}>Notes</NavLink>
                <NavLink to={'/auth/login'}>Logout</NavLink>
            </nav>
        </header>
    );
};

export default Header;
