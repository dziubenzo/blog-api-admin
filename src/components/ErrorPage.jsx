import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="error-page">
      <h2>Something went terribly wrong...</h2>
      <h2>
        Click <Link to="/">here</Link> to log in again.
      </h2>
    </div>
  );
}

export default ErrorPage;
