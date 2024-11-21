import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const UserLayout = () => {
    return (
        <Container>
            <Header />
            <Outlet />
        </Container>
    );
};

export default UserLayout;
