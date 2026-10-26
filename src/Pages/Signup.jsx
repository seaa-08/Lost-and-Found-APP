import { Link, useNavigate } from "react-router-dom";
import "../style/login-style.css";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    onSignup(name);
    navigate("/dashboard");
  };

  return (
    <div className="login-container register-container">
      <div className="login-form register-form">
        <h2>Daftar</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="name">Nama lengkap</label>
          <input id="name" name="name" type="text" placeholder="Masukkan nama lengkap" />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="nama@email.com" />

          <label htmlFor="phone">Nomor HP</label>
          <input id="phone" type="tel" placeholder="08xxxxxxxxxx" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Masukkan password" />

          <label htmlFor="confirm-password">Konfirmasi password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Ulangi password"
          />

          <button type="submit">Daftar</button>
        </form>
        <p>Sudah punya akun? <Link to="/">Masuk</Link></p>
      </div>
    </div>
  );
};

export default Signup;
