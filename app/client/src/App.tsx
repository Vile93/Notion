import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import UserLayout from './layouts/UserLayout/UserLayout';
import Aboutpage from './pages/Aboutpage';
import Notespage from './pages/Notespage/Notespage';
import Registerpage from './pages/Registerpage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createJWT } from './services/auth.service';
import NotFoundpage from './pages/NotFoundpage';
import AuthErrorLayout from './layouts/AuthLayout/AuthErrorLayout';
import UserErrorLayout from './layouts/UserLayout/UserErrorLayout';
import { saveJWT } from './utils/saveJWT';
import { clearJWT } from './utils/clearJWT';
import { createContext, useState } from 'react';
import Loader from './components/Loader';

interface IUserContext {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContext | null>(null);

function App() {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('jwt'));
    /*     const queryClient = useQueryClient();

    const {
        data: jwt,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['jwt'],
        queryFn: createJWT,
    });

    if (isLoading) return <Loader />;

    if (isSuccess) {
        if (jwt?.token) {
            saveJWT(jwt);
        } else {
            clearJWT();
        }
    } */

    const router = createBrowserRouter(
        [
            !isAuth
                ? {
                      path: '/',
                      element: <AuthLayout />,
                      errorElement: <AuthErrorLayout />,
                      children: [
                          { path: 'auth/register', element: <Registerpage /> },
                          { path: 'auth/login', element: <Loginpage /> },
                          {
                              index: true,
                              element: <Navigate to={'/auth/login'}></Navigate>,
                          },
                          {
                              path: '*',
                              element: <Navigate to={'/auth/login'}></Navigate>,
                          },
                      ],
                  }
                : {
                      path: '/',
                      element: <UserLayout />,
                      errorElement: <UserErrorLayout />,
                      children: [
                          { path: 'user/about', element: <Aboutpage /> },
                          { path: 'user/notes', element: <Notespage /> },
                          {
                              index: true,
                              element: <Navigate to={'/user/about'}></Navigate>,
                          },
                          {
                              path: 'auth/login',
                              element: <Navigate to={'/user/about'}></Navigate>,
                          },
                          {
                              path: 'auth/register',
                              element: <Navigate to={'/user/about'}></Navigate>,
                          },
                          {
                              path: '*',
                              element: <NotFoundpage />,
                          },
                      ],
                  },
        ],
        {
            future: {
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_relativeSplatPath: true,
                v7_skipActionErrorRevalidation: true,
            },
        }
    );

    return (
        <UserContext.Provider value={{ isAuth, setIsAuth }}>
            <RouterProvider
                router={router}
                future={{ v7_startTransition: true }}
            />
        </UserContext.Provider>
    );
}

export default App;
