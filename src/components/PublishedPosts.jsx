import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getToken } from '../helpers';
import API_URL from '../API';

function PublishedPosts() {
  const navigate = useNavigate();
  const posts = useLoaderData();

  // Get published posts
  const publishedPosts = posts.filter((post) => post.published === true);

  // State for showing the unpublishing process is in progress
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  // Unpublish all posts
  async function unpublishAllPosts() {
    try {
      setIsUnpublishing(true);
      const res = await fetch(`${API_URL}/posts/unpublish-all`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) {
        setIsUnpublishing(false);
        throw new Error('Unpublishing all posts failed...');
      }
      // Refresh page
      navigate();
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      {!publishedPosts.length ? (
        <h1 className="no-posts-heading">No published posts to show.</h1>
      ) : (
        <div className="published-posts">
          <h1>Posts - Published ({publishedPosts.length})</h1>
          <table className="published-posts-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {publishedPosts.map((post, index) => {
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
          <button type="button" onClick={unpublishAllPosts}>
            {isUnpublishing ? 'Unpublishing all posts...' : 'Unpublish All'}
          </button>
        </div>
      )}
    </>
  );
}

export default PublishedPosts;
