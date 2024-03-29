import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './ErrorPage';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Protector from './Protector';
import PostForm from './PostForm';
import AllPosts from './AllPosts';
import DeletePost from './DeletePost';
import EditPostForm from './EditPostForm';
import { allPostsLoader, postLoader } from '../loaders';

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
        {
          path: '/dashboard/new-post',
          element: (
            <Protector>
              <PostForm />
            </Protector>
          ),
        },
        {
          path: '/dashboard/all-posts',
          element: (
            <Protector>
              <AllPosts />
            </Protector>
          ),
          loader: allPostsLoader,
        },
        {
          path: '/dashboard/all-posts/:postId/edit',
          element: (
            <Protector>
              <EditPostForm />
            </Protector>
          ),
          loader: ({ params }) => postLoader(params.postId),
        },
        {
          path: '/dashboard/all-posts/:postId/delete',
          element: (
            <Protector>
              <DeletePost />
            </Protector>
          ),
          loader: ({ params }) => postLoader(params.postId),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
