import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { connect, ConnectedProps } from 'react-redux';
import { AppStore } from '../../../store/store';

const Header = ({ username }: PropsFromRedux) => {
    return (
        <header className="mb-16 flex justify-between items-center header">
            <div>
                Hello,{' '}
                <span className="font-bold">
                    {username?.toString() ??
                        JSON.parse(localStorage.getItem('user') ?? '{}')
                            ?.username}
                </span>
            </div>
            <nav className="header-nav">
                <NavLink to={'/user/about'}>About</NavLink>
                <NavLink to={'/user/notes'}>Notes</NavLink>
                <Logout />
            </nav>
        </header>
    );
};

const mapStateToProps = (state: AppStore) => ({
    username: state.data?.username,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
