import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getToken } from '../helpers';

function DeleteComment() {
  const navigate = useNavigate();
  const comment = useLoaderData();

  // State for showing the delete process is in progress
  const [isDeleting, setIsDeleting] = useState(false);
  // State for showing success message
  const [isDeleted, setIsDeleted] = useState(false);

  // Delete comment
  async function deleteComment() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `http://localhost:3000/posts/${comment.post}/comments/${comment._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (!res.ok) {
        setIsDeleting(false);
        throw new Error('Deleting comment failed...');
      }
      // Show success message and redirect to All Comments 3 seconds later
      setIsDeleting(false);
      setIsDeleted(true);
      setTimeout(() => {
        return navigate('/dashboard/all-comments');
      }, 3000);
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="delete-comment">
      {!isDeleted ? (
        <>
          <h1>Delete this comment?</h1>
          <p>{comment.content}</p>
          <p>
            by <span>{comment.author}</span>
          </p>
          <button type="button" onClick={deleteComment}>
            {isDeleting ? 'Deleting comment...' : 'Go Ahead'}
          </button>
        </>
      ) : (
        <>
          <h2>Comment deleted successfully!</h2>
          <h2>Redirecting to All Comments...</h2>
        </>
      )}
    </div>
  );
}

export default DeleteComment;
