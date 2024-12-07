import {
    Box,
    Button,
    CircularProgress,
    Modal,
    Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { formatDate } from '../../../utils/formatDate';
import CustomInput from '../../../components/CustomInput';
import { useForm } from 'react-hook-form';
import { INote } from '../../../interfaces/INote';
import useFetch from '../../../hooks/useFetch';
import { editNote } from '../../../services/note.service';
import { PLACEHOLDRS } from '../../../constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteSchema } from '../../../../../shared/src/Schemes/NoteSchema';
import { INoteResolve } from '../../../interfaces/INoteResolve';
import { USER_ACTIONS } from '../../../store/userReducer/userActions';

interface INoteEditProps {
    mutateNotes: React.Dispatch<React.SetStateAction<INoteResolve[]>>;
    title: string;
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    createdAt: string;
    text?: string;
    _id: string;
}

const NoteEdit: FC<INoteEditProps> = ({
    open,
    handleClose,
    title,
    text,
    _id,
    createdAt,
    mutateNotes,
}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title,
            text,
        },
        resolver: zodResolver(NoteSchema),
    });
    const editNoteFetch = useFetch(
        true,
        USER_ACTIONS.AUTH,
        USER_ACTIONS.UNAUTH
    );
    const onSubmit = (note: INote) => {
        editNoteFetch.fetchData(editNote, _id, note);
    };
    useEffect(() => {
        if (
            !editNoteFetch.isLoading &&
            !editNoteFetch.error.status &&
            editNoteFetch.isCompleted
        ) {
            mutateNotes((notes) =>
                notes?.map((note) =>
                    note?._id === _id ? editNoteFetch.data : note
                )
            );
        }
    }, [editNoteFetch.error.status, editNoteFetch.isLoading]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24,
                    padding: '0.5rem',
                    outline: 0,
                    background: 'rgba(255,255,255, 1)',
                }}
            >
                <div>
                    <form
                        className="flex flex-col gap-4 relative"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {editNoteFetch.isLoading && (
                            <div className="absolute inset-x-1/2 inset-y-1/2 -translate-x-5 -translate-y-5">
                                <CircularProgress />
                            </div>
                        )}
                        <CustomInput
                            name="title"
                            control={control}
                            placeholder={PLACEHOLDRS.NOTE_TITLE}
                            defaultValue={title}
                            className="w-full text-black px-2"
                        />
                        <CustomInput
                            className="w-full text-black px-2"
                            name="text"
                            control={control}
                            defaultValue={text}
                            placeholder={PLACEHOLDRS.NOTE_TEXT}
                        />
                        <Typography>
                            <span className="font-bold">Date of creation:</span>{' '}
                            {formatDate(new Date(createdAt))}
                        </Typography>
                        <Button type="submit">Edit</Button>
                        {editNoteFetch.error.status ? (
                            <Typography className="error">
                                {editNoteFetch.error?.message}
                            </Typography>
                        ) : null}
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default NoteEdit;
