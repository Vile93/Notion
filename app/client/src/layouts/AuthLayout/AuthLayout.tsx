import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
