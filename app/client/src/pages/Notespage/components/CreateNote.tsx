import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '../../../components/CustomInput';
import { PLACEHOLDRS } from '../../../constants';
import { Button } from '@mui/material';
import { NoteSchema } from '../../../../../shared/src/Schemes/NoteSchema';
import { useForm } from 'react-hook-form';
import { INote } from '../../../interfaces/INote';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createNote } from '../../../services/note.service';
import { createJWT } from '../../../services/auth.service';

const CreateNote = () => {
    const [isCreateEnabled, setIsCreateEnabled] = useState(false);
    const [isJWTEnabled, setIsJWTEnabled] = useState(false);
    const [note, setNote] = useState<INote>({
        title: '',
        text: '',
    });
    const { data: JWT } = useQuery({
        queryKey: ['jwt'],
        queryFn: createJWT,
        enabled: isJWTEnabled,
    });
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: '',
            text: '',
        },
        resolver: zodResolver(NoteSchema),
    });

    const { isLoading: isCreateNoteLoading } = useQuery({
        queryKey: ['createdNote', createJWT],
        queryFn: () => {
            setIsCreateEnabled(false);
            setIsJWTEnabled(false);
            return createNote(note);
        },
        enabled: isCreateEnabled && !!JWT,
    });
    const onSubmit = (newNote: INote) => {
        setIsCreateEnabled(true);
        setIsJWTEnabled(true);
        setNote(newNote);
    };
    return (
        <div className="mt-8 text-center">
            <form
                className="flex gap-4 text-left items-start"
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
