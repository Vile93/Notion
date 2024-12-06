import { INoteResolve } from '../../interfaces/INoteResolve';
import NoteCreate from './components/NoteCreate';
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect } from 'react';
import { fetchNotes } from '../../services/note.service';
import Note from './components/Note';
import Loader from '../../components/Loader';
import { NETWORK_ERROR } from '../../constants';
import Errorpage from '../../components/Errorpage';

const Notespage = () => {
    const user = useContext(UserContext);
    const notes = useFetch(true, user?.setIsAuth);
    useEffect(() => {
        notes.fetchData(fetchNotes);
    }, []);
    if (notes.error.status === true && notes.error.message === NETWORK_ERROR) {
        return (
            <Errorpage
                status={'500'}
                title="Internal Server Error."
                text="We are already working to solve the problem."
            />
        );
    }
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
            <NoteCreate mutateNotes={notes.mutateData} />

            <div className="flex flex-col gap-2 mt-2">
                {notes?.data
                    ?.toSorted(
                        (a: INoteResolve, b: INoteResolve) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    ?.map((note: INoteResolve) => (
                        <Note
                            key={note._id}
                            mutateNotes={notes.mutateData}
                            {...note}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Notespage;
