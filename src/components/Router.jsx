import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './ErrorPage';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Protector from './Protector';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <LoginForm />,
        },
        {
          path: '/dashboard',
          element: (
            <Protector>
              <Dashboard />
            </Protector>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
