import { createContext, useState } from 'react';

interface IUserContext {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    notes: INote[];
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext | null>(null);

import React from 'react';
import { IUser } from '../interfaces/IUser';
import { INote } from '../interfaces/INote';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('jwt'));
    const [user, setUser] = useState<IUser | null>(null);
    const [notes, setNotes] = useState<INote[]>([]);
    return (
        <UserContext.Provider
            value={{ isAuth, setIsAuth, user, setUser, notes, setNotes }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
