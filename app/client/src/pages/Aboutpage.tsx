import { Link } from 'react-router-dom';

const Aboutpage = () => {
    return (
        <div>
            <h1 className="title text-center">About me</h1>
            <div className="mt-8 flex flex-col gap-1">
                <div className="font-medium">
                    Username: <span className="text-gray-400">Name</span>
                </div>
                <div className="font-medium">
                    Email:{' '}
                    <span className="link">
                        <a href="mailto:test@gmail.com">test@gmail.com</a>
                    </span>
                </div>
                <div className="font-medium">
                    Date sign up:{' '}
                    <span className="text-gray-400">30.10.2022 12:00:02</span>
                </div>
            </div>
            <div className="text-center mt-8">
                <Link to={'/user/notes'} className="link text-2xl px-4">
                    Go to notes
                </Link>
            </div>
        </div>
    );
};

export default Aboutpage;
