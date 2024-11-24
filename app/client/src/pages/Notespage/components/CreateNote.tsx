import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../../../components/CustomInput';
import { PLACEHOLDRS } from '../../../constants';
import { Button } from '@mui/material';
import { NoteSchema } from '../../../../../shared/src/Schemes/NoteSchema';
import { useForm } from 'react-hook-form';
import { INote } from '../../../interfaces/INote';
import { createNote } from '../../../services/note.service';
import useFetch from '../../../hooks/useFetch';
import { FC, useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { INoteResolve } from '../../../interfaces/INoteResolve';

interface ICreateNoteProps {
    mutateNotes: React.Dispatch<React.SetStateAction<INoteResolve[]>>;
}

const CreateNote: FC<ICreateNoteProps> = ({ mutateNotes }) => {
    const user = useContext(UserContext);
    const newNoteFetch = useFetch(true, user?.setIsAuth);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: '',
            text: '',
        },
        resolver: zodResolver(NoteSchema),
    });
    const onSubmit = (newNote: INote) => {
        newNoteFetch.fetchData(createNote, newNote);
    };
    useEffect(() => {
        if (newNoteFetch.data?._id) {
            const { createdAt, title, text, _id } = newNoteFetch.data;
            mutateNotes((prev) => [
                ...prev,
                {
                    _id,
                    createdAt,
                    title,
                    text,
                },
            ]);
        }
    }, [newNoteFetch.data]);
    return (
        <div className="mt-8 text-center">
            <form
                className="flex gap-4 text-left items-start flex-wrap"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CustomInput
                    name="title"
                    control={control}
                    placeholder={PLACEHOLDRS.NOTE_TITLE}
                />
                <CustomInput
                    name="text"
                    control={control}
                    placeholder={PLACEHOLDRS.NOTE_TEXT}
                />
                <Button className="text-sm" variant="outlined" type="submit">
                    Add new note
                </Button>
            </form>
        </div>
    );
};

export default CreateNote;
