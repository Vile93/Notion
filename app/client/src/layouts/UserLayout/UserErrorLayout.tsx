import { Container } from '@mui/material';
import Header from './components/Header';
import Errorpage from '../../components/Errorpage';

const UserErrorLayout = () => {
    return (
        <Container>
            <Header />
            <Errorpage
                status={'500'}
                title="Internal Server Error."
                text="We are already working to solve the problem."
            />
        </Container>
    );
};

export default UserErrorLayout;
