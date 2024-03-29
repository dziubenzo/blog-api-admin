import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getToken } from '../helpers';

function UnpublishedPosts() {
  const navigate = useNavigate();
  const posts = useLoaderData();

  // Get unpublished posts
  const unpublishedPosts = posts.filter((post) => post.published === false);

  // State for showing the publishing process is in progress
  const [isPublishing, setIsPublishing] = useState(false);

  // Publish all posts
  async function publishAllPosts() {
    try {
      setIsPublishing(true);
      const res = await fetch('http://localhost:3000/posts/publish-all', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) {
        setIsPublishing(false);
        throw new Error('Publishing all posts failed...');
      }
      // Refresh page
      navigate();
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      {!unpublishedPosts.length ? (
        <h1>No unpublished posts to show.</h1>
      ) : (
        <div className="unpublished-posts">
          <h1>Posts - Unpublished ({unpublishedPosts.length})</h1>
          <table className="unpublished-posts-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {unpublishedPosts.map((post, index) => {
                return (
                  <tr key={post._id}>
                    <th>{index + 1}</th>
                    <td className="post-title">{post.title}</td>
                    <td>{post.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button type="button" onClick={publishAllPosts}>
            {isPublishing ? 'Publishing all posts...' : 'Publish All'}
          </button>
        </div>
      )}
    </>
  );
}

export default UnpublishedPosts;
