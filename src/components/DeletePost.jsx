import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getToken } from '../helpers';
import API_URL from '../API';

function DeletePost() {
  const navigate = useNavigate();
  const post = useLoaderData();

  // State for showing the delete process is in progress
  const [isDeleting, setIsDeleting] = useState(false);
  // State for showing success message
  const [isDeleted, setIsDeleted] = useState(false);

  // Delete post
  async function deletePost() {
    try {
      setIsDeleting(true);
      const res = await fetch(`${API_URL}/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) {
        setIsDeleting(false);
        throw new Error('Deleting post failed...');
      }
      // Show success message and redirect to All Posts 1 second later
      setIsDeleting(false);
      setIsDeleted(true);
      setTimeout(() => {
        return navigate('/dashboard/all-posts');
      }, 1000);
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="delete-post">
      {!isDeleted ? (
        <>
          <h1>Delete this post?</h1>
          <p>{post.title}</p>
          <p>
            by <span>{post.author}</span>
          </p>
          <button type="button" onClick={deletePost}>
            {isDeleting ? 'Deleting post...' : 'Go Ahead'}
          </button>
        </>
      ) : (
        <>
          <h2>Post deleted successfully!</h2>
          <h2>Redirecting to All Posts...</h2>
        </>
      )}
    </div>
  );
}

export default DeletePost;
