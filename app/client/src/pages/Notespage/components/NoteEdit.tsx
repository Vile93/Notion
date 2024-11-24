import {
    Box,
    Button,
    CircularProgress,
    Modal,
    Typography,
} from '@mui/material';
import { FC, useContext } from 'react';
import { formatDate } from '../../../utils/formatDate';
import CustomInput from '../../../components/CustomInput';
import { useForm } from 'react-hook-form';
import { INote } from '../../../interfaces/INote';
import useFetch from '../../../hooks/useFetch';
import { editNote } from '../../../services/note.service';
import { UserContext } from '../../../contexts/UserContext';

interface INoteEdit {
    title: string;
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
    createdAt: string;
    text?: string;
    _id: string;
}

const NoteEdit: FC<INoteEdit> = ({
    open,
    handleClose,
    title,
    text,
    _id,
    createdAt,
}) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title,
            text,
        },
    });
    const user = useContext(UserContext);
    const editNoteFetch = useFetch(true, !!user?.isAuth);
    const onSubmit = (note: INote) => {
        editNoteFetch.fetchData(editNote, _id, note);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            {editNoteFetch.isLoading ? (
                <CircularProgress />
            ) : (
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
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <CustomInput
                                name="title"
                                control={control}
                                placeholder={'Title'}
                                defaultValue={title}
                                className="w-full text-black px-2"
                            />
                            <CustomInput
                                className="w-full text-black px-2"
                                name="text"
                                control={control}
                                defaultValue={text}
                                placeholder={'Text'}
                            />
                            <Typography>
                                <span className="font-bold">
                                    Date of creation:
                                </span>{' '}
                                {formatDate(new Date(createdAt))}
                            </Typography>
                            <Button type="submit">Edit</Button>
                        </form>
                    </div>
                </Box>
            )}
        </Modal>
    );
};

export default NoteEdit;
