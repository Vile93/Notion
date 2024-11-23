import { INote } from '../interfaces/INote';
import { fetchOptions } from '../utils/fetchOptions';

export const fetchNotes = () => {
    return fetch(import.meta.env.VITE_API + '/notes', {
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};

export const createNote = (note: INote) => {
    return fetch(import.meta.env.VITE_API + '/notes', {
        method: 'POST',
        body: JSON.stringify(note),
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};

export const deleteNote = (id: string) => {
    return fetch(import.meta.env.VITE_API + `/notes/${id}`, {
        method: 'DELETE',
        ...(fetchOptions() as RequestInit),
    }).then((res) => res.json());
};
