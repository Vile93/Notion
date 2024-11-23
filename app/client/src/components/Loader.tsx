import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
};

export default Loader;
