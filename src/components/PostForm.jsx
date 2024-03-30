import { useState } from 'react';
import ReactQuill from 'react-quill/dist/react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions, getToken } from '../helpers';
import { useNavigate } from 'react-router-dom';
import API_URL from '../API';

function PostForm() {
  const navigate = useNavigate();

  // State for showing error messages to user
  const [error, setError] = useState('');
  // State for rich text editor data
  const [content, setContent] = useState('');
  // State for showing the post submitting process is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create new post
  async function createPost(event) {
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
    const newPostData = {
      title: formData.get('title'),
      author: formData.get('author'),
      content: content,
      published: Boolean(formData.get('published')),
    };
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(newPostData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      // Show error message for 3 seconds and clear form fields if credentials incorrect
      if (!res.ok) {
        setIsSubmitting(false);
        setError('Server error (probably). Please try again.');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
      // Redirect to Dashboard
      setIsSubmitting(false);
      return navigate('/dashboard');
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="new-post">
      <h1 className="page-title">Create New Post</h1>
      <form className="post-form" method="post" onSubmit={createPost}>
        <label htmlFor="title">Title:</label>
        <textarea
          type="text"
          name="title"
          id="title"
          minLength="3"
          maxLength="160"
          rows="4"
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          minLength="3"
          maxLength="64"
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
        <button type="submit">
          {isSubmitting ? 'Submitting post...' : 'Submit Post'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default PostForm;
