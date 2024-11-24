import { CircularProgress, Grid } from '@mui/material';
import { INoteResolve } from '../../interfaces/INoteResolve';
import { formatDate } from '../../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNote from './components/CreateNote';
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect } from 'react';
import { fetchNotes } from '../../services/note.service';

const Notespage = () => {
    const user = useContext(UserContext);
    const notes = useFetch(true, !!user?.isAuth);
    useEffect(() => {
        if (user?.setIsAuth && !notes.isAuth) user.setIsAuth(false);
    }, [notes.isAuth, user]);
    useEffect(() => {
        notes.fetchData(fetchNotes);
    }, []);
    return (
        <div>
            <h1 className="title text-center">Notes</h1>
            <CreateNote />
            {notes.isLoading ? (
                <div
                    className="text-center mt-8
                "
                >
                    <CircularProgress />
                </div>
            ) : (
                <div className="flex flex-col gap-2 mt-2">
                    {!notes.data?.message &&
                        notes.data?.map((note: INoteResolve) => (
                            <div
                                key={note._id}
                                className="bg-gray-200 rounded p-2 flex items-center justify-between"
                            >
                                <div className="flex gap-4 items-center">
                                    <div className="font-bold">
                                        {note.title}
                                    </div>
                                    <div>
                                        {formatDate(new Date(note.createdAt))}
                                    </div>
                                </div>
                                <div>
                                    <Grid
                                        item
                                        xs={8}
                                        className="cursor-pointer hover:text-red-600"
                                    >
                                        <DeleteIcon />
                                    </Grid>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Notespage;
