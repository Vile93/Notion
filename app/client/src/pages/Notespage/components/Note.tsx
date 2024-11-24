import { FC, useContext, useEffect } from 'react';
import { INoteResolve } from '../../../interfaces/INoteResolve';
import { formatDate } from '../../../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, Grid } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import { UserContext } from '../../../contexts/UserContext';
import { deleteNote } from '../../../services/note.service';
import NoteInfo from './NoteInfo';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import useModal from '../../../hooks/useModal';
import NoteEdit from './NoteEdit';

interface INoteProps extends INoteResolve {
    mutateNotes: React.Dispatch<React.SetStateAction<INoteResolve[]>>;
}

const Note: FC<INoteProps> = ({ _id, createdAt, title, text, mutateNotes }) => {
    const user = useContext(UserContext);
    const deleteNoteFetch = useFetch(true, user?.setIsAuth);
    const showNoteInfo = useModal();
    const editNoteInfo = useModal();

    useEffect(() => {
        if (!deleteNoteFetch.error.status && deleteNoteFetch.isCompleted)
            mutateNotes((prev) =>
                prev.filter((note: INoteResolve) => note._id !== _id)
            );
    }, [
        deleteNoteFetch.data,
        deleteNoteFetch.error.status,
        deleteNoteFetch.isCompleted,
    ]);

    if (deleteNoteFetch.isLoading)
        return (
            <div className="text-center">
                <CircularProgress />
            </div>
        );
    return (
        <div className="bg-gray-200 rounded p-2 flex items-center justify-between">
            <div className="flex gap-4 items-center">
                <div className="font-bold text-ellipsis overflow-hidden w-24 whitespace-nowrap">
                    {title}
                </div>
                <div>{formatDate(new Date(createdAt))}</div>
            </div>
            <div className="flex gap-4">
                <Grid
                    item
                    xs={8}
                    className="cursor-pointer link text-black"
                    onClick={showNoteInfo.openModal}
                >
                    <OpenInNewIcon />
                </Grid>
                <Grid
                    item
                    xs={8}
                    className="cursor-pointer link text-black"
                    onClick={editNoteInfo.openModal}
                >
                    <EditIcon />
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

            <NoteInfo
                handleClose={showNoteInfo.closeModal}
                open={showNoteInfo.isOpen}
                text={text}
                title={title}
                createdAt={createdAt}
            />
            <NoteEdit
                mutateNotes={mutateNotes}
                handleClose={editNoteInfo.closeModal}
                open={editNoteInfo.isOpen}
                text={text}
                title={title}
                createdAt={createdAt}
                _id={_id}
            />
        </div>
    );
};

export default Note;
