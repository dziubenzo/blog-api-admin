import { useLoaderData } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { toolbarOptions } from '../helpers';

function EditPostForm() {
  const post = useLoaderData();

  const [content, setContent] = useState(post.content);
  const [error, setError] = useState('');

  return (
    <div className="edit-post">
      <h1 className="page-title">Edit Post</h1>
      <form className="post-form" method="post">
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
        <input
          type="checkbox"
          name="published"
          id="published"
          value="true"
        />
        <button type="submit">Edit Post</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default EditPostForm;
