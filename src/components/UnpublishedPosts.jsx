import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function UnpublishedPosts() {
  const posts = useLoaderData();

  // State for showing the publishing process is in progress
  const [isPublishing, setIsPublishing] = useState(false);

  // Get unpublished posts
  const unpublishedPosts = posts.filter((post) => post.published === false);

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
          <button type="button">
            {isPublishing ? 'Publishing all posts...' : 'Publish All'}
          </button>
        </div>
      )}
    </>
  );
}

export default UnpublishedPosts;
