import { Link, useLoaderData } from 'react-router-dom';

function AllPosts() {
  const posts = useLoaderData();

  return (
    <>
      {!posts.length ? (
        <h1 className='no-posts-heading'>No posts to show.</h1>
      ) : (
        <div className="all-posts">
          <h1>All Posts ({posts.length})</h1>
          <table className="all-posts-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr key={post._id}>
                    <th>{index + 1}</th>
                    <td className="post-title">{post.title}</td>
                    <td>{post.author}</td>
                    <td>
                      <Link to={`${post._id}/edit`}>
                        <img src="/edit.svg" alt="Edit Post Icon" />
                      </Link>
                    </td>
                    <td>
                      <Link to={`${post._id}/delete`}>
                        <img src="/delete.svg" alt="Delete Post Icon" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AllPosts;
