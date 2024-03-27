function LoginForm() {
  return (
    <div className="login-form">
      <form method="post">
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
    </div>
  );
}

export default LoginForm;
