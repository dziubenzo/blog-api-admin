import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

function PublishedPosts() {
  const navigate = useNavigate();
  const posts = useLoaderData();

  // Get published posts
  const publishedPosts = posts.filter((post) => post.published === true);

  // State for showing the unpublishing process is in progress
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  return (
    <>
      {!publishedPosts.length ? (
        <h1>No published posts to show.</h1>
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
          <button type="button">
            {isUnpublishing ? 'Unpublishing all posts...' : 'Unpublish All'}
          </button>
        </div>
      )}
    </>
  );
}

export default PublishedPosts;
