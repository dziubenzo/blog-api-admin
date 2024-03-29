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
import {
  allCommentsLoader,
  allPostsLoader,
  commentLoader,
  postLoader,
} from '../loaders';
import UnpublishedPosts from './UnpublishedPosts';
import PublishedPosts from './PublishedPosts';
import AllComments from './AllComments';
import EditCommentForm from './EditCommentForm';
import DeleteComment from './DeleteComment';

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
        {
          path: '/dashboard/unpublished-posts',
          element: (
            <Protector>
              <UnpublishedPosts />
            </Protector>
          ),
          loader: allPostsLoader,
        },
        {
          path: '/dashboard/published-posts',
          element: (
            <Protector>
              <PublishedPosts />
            </Protector>
          ),
          loader: allPostsLoader,
        },
        {
          path: '/dashboard/all-comments',
          element: (
            <Protector>
              <AllComments />
            </Protector>
          ),
          loader: allCommentsLoader,
        },
        {
          path: '/dashboard/posts/:postId/comments/:commentId/edit',
          element: (
            <Protector>
              <EditCommentForm />
            </Protector>
          ),
          loader: ({ params }) =>
            commentLoader(params.postId, params.commentId),
        },
        {
          path: '/dashboard/posts/:postId/comments/:commentId/delete',
          element: (
            <Protector>
              <DeleteComment />
            </Protector>
          ),
          loader: ({ params }) =>
            commentLoader(params.postId, params.commentId),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
