import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoginForm from './LoginForm';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginForm />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/posts',
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
