import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <header>
        <h1>Blog API</h1>
        <h3>Admin Page</h3>
        {isAuth ? (
          <h3>
            <Link to="/dashboard">Dashboard</Link>
          </h3>
        ) : (
          <h3>Logged Out</h3>
        )}
      </header>
      <main>
        <Outlet context={{ isAuth, setIsAuth }} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
