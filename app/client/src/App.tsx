import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import UserLayout from './layouts/UserLayout/UserLayout';
import Aboutpage from './pages/Aboutpage';
import Notespage from './pages/Notespage';
import Registerpage from './pages/Registerpage';

const router = createBrowserRouter(
    [
        {
            path: '/',

            element: <AuthLayout />,
            errorElement: <>Error</>,
            children: [
                { path: 'auth/register', element: <Registerpage /> },
                { path: 'auth/login', element: <Loginpage /> },
                {
                    index: true,
                    element: <Navigate to={'auth/login'}></Navigate>,
                },
            ],
        },
        {
            path: '/',
            element: <UserLayout />,
            errorElement: <>Error2</>,
            children: [
                { path: 'user/about', element: <Aboutpage /> },
                { path: 'user/notes', element: <Notespage /> },
                {
                    index: true,
                    element: <Navigate to={'user/about'}></Navigate>,
                },
            ],
        },
        {
            path: '*',
            element: <>Error Not Found</>,
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

function App() {
    return (
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    );
}

export default App;
