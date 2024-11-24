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
    const notes = useFetch(true, user?.setIsAuth);
    useEffect(() => {
        notes.fetchData(fetchNotes);
    }, []);

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
            <CreateNote mutateNotes={notes.mutateData} />

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
                            {...note}
                            mutateNotes={notes.mutateData}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Notespage;
