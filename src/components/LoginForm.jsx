import { useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import API_URL from '../API';

function LoginForm() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { setIsAuth } = useOutletContext();

  // State for showing errors
  const [error, setError] = useState('');

  // Log in user
  async function logIn(event) {
    event.preventDefault();
    // Retrieve and prepare form data
    const formData = new FormData(event.target);
    const newCommentData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(newCommentData),
        headers: { 'Content-Type': 'application/json' },
      });
      // Show error message for 3 seconds and clear form fields if credentials incorrect
      if (!res.ok) {
        setError('Incorrect credentials.');
        setTimeout(() => {
          setError('');
        }, 3000);
        formRef.current.reset();
        return;
      }
      // Store token in localStorage and authenticate user
      const { token } = await res.json();
      localStorage.setItem('blogAPIToken', token);
      setIsAuth(true);
      // Redirect to Dashboard page
      return navigate('/dashboard');
    } catch (error) {
      setError('Server error. Please try again.');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }
  return (
    <div className="login-form">
      <form ref={formRef} method="post" onSubmit={logIn}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          minLength="1"
          maxLength="16"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="1"
          maxLength="16"
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <h3 className="error-message">{error}</h3>}
    </div>
  );
}

export default LoginForm;
