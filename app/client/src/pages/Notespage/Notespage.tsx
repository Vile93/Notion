import { CircularProgress, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/note.service';
import { INoteResolve } from '../../interfaces/INoteResolve';
import { formatDate } from '../../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';
import { getJWT } from '../../services/auth.service';
import CreateNote from './components/CreateNote';

const Notespage = () => {
    const { data: notes, isLoading: isfetchNotesLoading } = useQuery({
        queryKey: ['notes', getJWT],
        queryFn: fetchNotes,
    });

    return (
        <div>
            <h1 className="title text-center">Notes</h1>
            <CreateNote />
            {isfetchNotesLoading ? (
                <CircularProgress />
            ) : (
                <div className="flex flex-col gap-2 mt-2">
                    {!notes?.message &&
                        notes &&
                        notes?.map((note: INoteResolve) => (
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
