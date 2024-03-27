import Footer from './Footer';
import Router from './Router';

function App() {
  return (
    <>
      <header>
        <h1>Blog API</h1>
        <h3>Admin Page</h3>
      </header>
      <main>
        <Router />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
