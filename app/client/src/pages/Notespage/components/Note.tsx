import { FC, useContext, useEffect, useRef, useState } from 'react';
import { INoteResolve } from '../../../interfaces/INoteResolve';
import { formatDate } from '../../../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, Grid } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import { UserContext } from '../../../contexts/UserContext';
import { deleteNote } from '../../../services/note.service';
import CustomModal from './CustomModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Note: FC<INoteResolve> = ({ _id, createdAt, title, text }) => {
    const user = useContext(UserContext);
    const deleteNoteFetch = useFetch(true, !!user?.isAuth);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /*  const deleteRef = useRef<HTMLDivElement | null>(null); */

    useEffect(() => {
        if (deleteNoteFetch.isCompleted)
            user?.setNotes((prev) =>
                prev.filter((note: INoteResolve) => note._id !== _id)
            );
    }, [deleteNoteFetch.data]);
    if (deleteNoteFetch.isLoading) return <CircularProgress />;
    console.log('rerender');

    return (
        <div
            className="bg-gray-200 rounded p-2 flex items-center justify-between"
            onClick={(e) => {
                const target = e.target as HTMLElement;
                /* if (!target.closest('.delete')) handleOpen(); */
            }}
        >
            <div className="flex gap-4 items-center">
                <div className="font-bold">{title}</div>
                <div>{formatDate(new Date(createdAt))}</div>
            </div>
            <div className="flex gap-4">
                <Grid
                    item
                    xs={8}
                    className="cursor-pointer link text-black"
                    onClick={handleOpen}
                >
                    <OpenInNewIcon />
                </Grid>
                <Grid
                    item
                    xs={8}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => deleteNoteFetch.fetchData(deleteNote, _id)}
                >
                    <DeleteIcon />
                </Grid>
            </div>

            <CustomModal
                handleClose={handleClose}
                open={open}
                text={text}
                title={title}
                createdAt={createdAt}
            />
        </div>
    );
};

export default Note;
