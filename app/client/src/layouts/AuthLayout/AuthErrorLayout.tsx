import { Container } from '@mui/material';
import Errorpage from '../../components/Errorpage';
import Header from './components/Header';

const AuthErrorLayout = () => {
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

export default AuthErrorLayout;
