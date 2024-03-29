import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getToken } from '../helpers';

function EditCommentForm() {
  const navigate = useNavigate();
  const comment = useLoaderData();

  const [error, setError] = useState('');
  // State for showing the editing process is in progress
  const [isEditing, setIsEditing] = useState(false);

  // Edit comment
  async function editComment(event) {
    event.preventDefault();
    // Retrieve and prepare form data
    const formData = new FormData(event.target);
    const editedCommentData = {
      author: formData.get('author'),
      content: formData.get('content'),
      avatar_colour: formData.get('avatar_colour'),
    };
    try {
      setIsEditing(true);
      const res = await fetch(
        `http://localhost:3000/posts/${comment.post}/comments/${comment._id}`,
        {
          method: 'PUT',
          body: JSON.stringify(editedCommentData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      // Show error message for 3 seconds and clear form fields if there's something wrong
      if (!res.ok) {
        setIsEditing(false);
        setError('Server error (probably). Please try again.');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
      // Redirect to All Comments
      setIsEditing(false);
      return navigate('/dashboard/all-comments');
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="edit-comment">
      <h1 className="page-title">Edit Comment</h1>
      <form className="comment-form" method="post" onSubmit={editComment}>
        <label htmlFor="author">Nickname:</label>
        <input
          type="text"
          name="author"
          id="author"
          minLength="3"
          maxLength="64"
          defaultValue={comment.author}
          required
        />
        <label htmlFor="content">Text:</label>
        <textarea
          name="content"
          id="content"
          rows="8"
          minLength="3"
          maxLength="320"
          defaultValue={comment.content}
          required
        ></textarea>
        <label htmlFor="avatar-colour">Avatar Colour:</label>
        <input
          type="color"
          name="avatar_colour"
          id="avatar-colour"
          defaultValue={comment.avatar_colour}
        />
        <button type="submit">
          {isEditing ? 'Editing comment...' : 'Edit Comment'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default EditCommentForm;
