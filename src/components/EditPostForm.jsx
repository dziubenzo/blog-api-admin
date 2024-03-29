import { useLoaderData, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { toolbarOptions } from '../helpers';
import { getToken } from '../helpers';

function EditPostForm() {
  const navigate = useNavigate();
  const post = useLoaderData();

  const [content, setContent] = useState(post.content);
  const [error, setError] = useState('');

  // Edit post
  async function editPost(event) {
    event.preventDefault();
    // Show error message for 3 seconds if the text field is empty
    if (!content) {
      setError('Text field cannot be empty.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    // Retrieve and prepare form data
    const formData = new FormData(event.target);
    const editedPostData = {
      title: formData.get('title'),
      author: formData.get('author'),
      content: content,
      published: Boolean(formData.get('published')),
    };
    try {
      const res = await fetch(`http://localhost:3000/posts/${post._id}`, {
        method: 'PUT',
        body: JSON.stringify(editedPostData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      // Show error message for 3 seconds and clear form fields if credentials incorrect
      if (!res.ok) {
        setError('Server error (probably). Please try again.');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
      // Redirect to All Posts
      return navigate('/dashboard/all-posts');
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="edit-post">
      <h1 className="page-title">Edit Post</h1>
      <form className="post-form" method="post" onSubmit={editPost}>
        <label htmlFor="title">Title:</label>
        <textarea
          type="text"
          name="title"
          id="title"
          minLength="3"
          maxLength="160"
          rows="4"
          value={post.title}
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          minLength="3"
          maxLength="64"
          value={post.author}
          required
        />
        <label>Text:</label>
        <div className="rich-editor">
          <ReactQuill
            theme="snow"
            modules={{ toolbar: toolbarOptions }}
            value={content}
            onChange={setContent}
          />
        </div>
        <label htmlFor="published">Publish?</label>
        <input type="checkbox" name="published" id="published" value="true" />
        <button type="submit">Edit Post</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default EditPostForm;
