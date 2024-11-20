import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import UserLayout from './layouts/UserLayout/UserLayout';
import Aboutpage from './pages/Aboutpage';
import Notespage from './pages/Notespage';
import Registerpage from './pages/Registerpage';

const router = createBrowserRouter(
    [
        {
            path: 'auth',
            element: <AuthLayout />,
            errorElement: <>Error</>,
            children: [
                { path: 'register', element: <Registerpage /> },
                { path: 'login', element: <Loginpage /> },
            ],
        },
        {
            path: 'user/',
            element: <UserLayout />,
            errorElement: <>Error2</>,
            children: [
                { path: 'about', element: <Aboutpage /> },
                { path: 'notes', element: <Notespage /> },
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
