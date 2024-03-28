import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-links">
        <Link className="link" to="new-post">
          New Post
        </Link>
        <Link className="link" to="all-posts">
          All Posts
        </Link>
        <Link className="link" to="unpublished-posts">
          Unpublished Posts
        </Link>
        <Link className="link" to="published-posts">
          Published Posts
        </Link>
        <Link className="link" to="all-comments">
          All Comments
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
