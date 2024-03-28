import { useState } from 'react';
import ReactQuill from 'react-quill/dist/react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from '../helpers';

function PostForm() {
  const [content, setContent] = useState('');

  return (
    <div className="new-post">
      <h1 className="page-title">Create New Post</h1>
      <form className="post-form" method="post">
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
        <input type="checkbox" name="published" id="published" />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default PostForm;
