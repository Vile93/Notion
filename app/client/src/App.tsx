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
import { useQuery } from '@tanstack/react-query';
import { getJWT } from './services/auth.service';
import { CircularProgress } from '@mui/material';
import NotFoundpage from './pages/NotFoundpage';
import AuthErrorLayout from './layouts/AuthLayout/AuthErrorLayout';
import UserErrorLayout from './layouts/UserLayout/UserErrorLayout';

function App() {
    const { data, isLoading } = useQuery({
        queryKey: ['jwt'],
        queryFn: getJWT,
        refetchOnWindowFocus: false,
        staleTime: 0,
    });
    console.log(data, 'jwt');

    if (isLoading)
        return (
            <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        );

    const router = createBrowserRouter(
        [
            !data?.token
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
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    );
}

export default App;
