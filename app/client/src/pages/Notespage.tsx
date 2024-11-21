import { Button } from '@mui/material';

const Notespage = () => {
    return (
        <div>
            <h1 className="title text-center">Notes</h1>
            <div className="mt-8 text-center">
                <Button variant="outlined">Add new note</Button>
            </div>
            <div></div>
        </div>
    );
};

export default Notespage;
