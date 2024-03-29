import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AllComments() {
  const comments = useLoaderData();

  return (
    <>
      {!comments.length ? (
        <h1 className='no-comments-heading'>No comments to show.</h1>
      ) : (
        <div className="all-comments">
          <h1>All Comments ({comments.length})</h1>
          <table className="all-comments-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nickname</th>
                <th>Text</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => {
                return (
                  <tr key={comment._id}>
                    <th>{index + 1}</th>
                    <td className="comment-author">
                      {comment.author}
                    </td>
                    <td className="comment-content">{comment.content}</td>
                    <td>
                      <Link to={`${comment._id}/edit`}>
                        <img src="/edit.svg" alt="Edit Comment Icon" />
                      </Link>
                    </td>
                    <td>
                      <Link to={`${comment._id}/delete`}>
                        <img src="/delete.svg" alt="Delete Comment Icon" />
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

export default AllComments;
