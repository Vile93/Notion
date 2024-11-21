import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Container } from '@mui/material';

const AuthLayout = () => {
    return (
        <Container>
            <Header />
            <Outlet />
        </Container>
    );
};

export default AuthLayout;
