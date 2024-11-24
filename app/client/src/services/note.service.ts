import { INote } from '../interfaces/INote';
import { axiosInstance } from './main.service';

export const fetchNotes = () => {
    return axiosInstance.get('/notes');
};

export const createNote = (note: INote) => {
    return axiosInstance.post('/notes', {
        ...note,
    });
};

export const deleteNote = (id: string) => {
    return axiosInstance.delete(import.meta.env.VITE_API + `/notes/${id}`);
};

export const editNote = (id: string, newNoteData: INote) => {
    return axiosInstance.put(`/notes/${id}`, {
        ...newNoteData,
    });
};
