import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function EditCommentForm() {
  const comment = useLoaderData();

  // State for showing the editing process is in progress
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="edit-comment">
      <h1 className="page-title">Edit Comment</h1>
      <form className="comment-form" method="post">
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
      </form>
    </div>
  );
}

export default EditCommentForm;
