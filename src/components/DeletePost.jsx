import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function DeletePost() {
  const post = useLoaderData();

  // State for showing success message
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div className="delete-post">
      {!isDeleted ? (
        <>
          <h1>Delete this post?</h1>
          <p>{post.title}</p>
          <p>by {post.author}</p>
          <button type="button">Go Ahead</button>
        </>
      ) : (
        <>
          <h1>Post deleted successfully!</h1>
          <h1>Redirecting to All Posts...</h1>
        </>
      )}
    </div>
  );
}

export default DeletePost;
