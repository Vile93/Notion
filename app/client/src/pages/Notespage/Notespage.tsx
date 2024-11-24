import { INoteResolve } from '../../interfaces/INoteResolve';
import CreateNote from './components/CreateNote';
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect } from 'react';
import { fetchNotes } from '../../services/note.service';
import Note from './components/Note';
import Loader from '../../components/Loader';

const Notespage = () => {
    const user = useContext(UserContext);
    const notes = useFetch(true, !!user?.isAuth);
    useEffect(() => {
        if (user?.setIsAuth && !notes.isAuth) user.setIsAuth(false);
    }, [notes.isAuth, user]);
    useEffect(() => {
        notes.fetchData(fetchNotes);
    }, []);
    useEffect(() => {
        if (user?.setNotes && notes.data?.length) {
            user.setNotes(notes.data);
        }
    }, [notes.data]);
    if (notes.isLoading) {
        return (
            <div className="text-center mt-8">
                <Loader />
            </div>
        );
    }
    return (
        <div>
            <h1 className="title text-center">Notes</h1>
            <CreateNote />

            <div className="flex flex-col gap-2 mt-2">
                {user?.notes?.map((note: INoteResolve) => (
                    <Note key={note._id} {...note} />
                ))}
            </div>
        </div>
    );
};

export default Notespage;
