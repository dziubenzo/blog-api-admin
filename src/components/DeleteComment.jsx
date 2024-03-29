import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

function DeleteComment() {
  const navigate = useNavigate();
  const comment = useLoaderData();

  // State for showing the delete process is in progress
  const [isDeleting, setIsDeleting] = useState(false);
  // State for showing success message
  const [isDeleted, setIsDeleted] = useState(false);
  
  return (
    <div className="delete-comment">
      {!isDeleted ? (
        <>
          <h1>Delete this comment?</h1>
          <p>{comment.content}</p>
          <p>
            by <span>{comment.author}</span>
          </p>
          <button type="button">
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
