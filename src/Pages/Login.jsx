import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logoimg from "../assets/logo.jpeg";
import "../style/login-style.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (username !== "user" || password !== "1111") {
      setError("Username atau password salah.");
      return;
    }

    setError("");
    onLogin(username);
    navigate("/dashboard");
  };

  return (
    <main className="auth-page auth-page-login">
      <div className="auth-stack">
        <section className="auth-card auth-card-login" aria-label="Login">
          <header className="auth-heading">
            <img className="auth-logo" src={Logoimg} alt="Logo Lost &amp; Found" />
            <div>
              <h1>Login</h1>
              <p>Masuk ke akun Lost &amp; Found Anda</p>
            </div>
          </header>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                name="username"
                type="text"
                placeholder="Masukkan username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth-submit" type="submit">Login</button>
          </form>

          <p className="auth-switch">
            Belum punya akun? <Link to="/signup">Sign up</Link>
          </p>
        </section>

        <p className="auth-demo-credentials">
        <strong>Username: user</strong> / <strong>Password: 1111</strong>
        </p>
      </div>
    </main>
  );
};

export default Login;
