import { INoteResolve } from '../../interfaces/INoteResolve';
import NoteCreate from './components/NoteCreate';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { fetchNotes } from '../../services/note.service';
import Note from './components/Note';
import Loader from '../../components/Loader';
import { NETWORK_ERROR } from '../../constants';
import Errorpage from '../../components/Errorpage';
import { USER_ACTIONS } from '../../store/userReducer/userActions';

const Notespage = () => {
    const notesFetch = useFetch(true, USER_ACTIONS.AUTH, USER_ACTIONS.UNAUTH);
    useEffect(() => {
        notesFetch.fetchData(fetchNotes);
    }, []);
    if (
        notesFetch.error.status === true &&
        notesFetch.error.message === NETWORK_ERROR
    ) {
        return (
            <Errorpage
                status={'500'}
                title="Internal Server Error."
                text="We are already working to solve the problem."
            />
        );
    }
    if (notesFetch.isLoading) {
        return (
            <div className="text-center mt-8">
                <Loader />
            </div>
        );
    }
    return (
        <div>
            <h1 className="title text-center">Notes</h1>
            <NoteCreate mutateNotes={notesFetch.mutateData} />

            <div className="flex flex-col gap-2 mt-2">
                {notesFetch?.data
                    ?.toSorted(
                        (a: INoteResolve, b: INoteResolve) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    ?.map((note: INoteResolve) => (
                        <Note
                            key={note._id}
                            mutateNotes={notesFetch.mutateData}
                            {...note}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Notespage;
