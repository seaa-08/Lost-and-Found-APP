import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LampScene from "../components/LampScene";
import { fileToAvatar, registerAccount } from "../auth/authStore";
import "../style/login-style.css";
import "../style/auth-extra.css";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [error, setError] = useState("");

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setPhoto(await fileToAvatar(file));
      setPhotoName(file.name);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = registerAccount({
      username: formData.get("username"),
      email: formData.get("email"),
      institution: formData.get("institution"),
      city: formData.get("city"),
      password: formData.get("password"),
      photo,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    onSignup(result.account.username);
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <LampScene>
        <section className="auth-card auth-card-signup" aria-label="Sign up">
          <header className="auth-heading">
            <h1>Sign up</h1>
            <p>Buat akun Lost &amp; Found</p>
          </header>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-photo">
              <div className="auth-photo-preview">
                {photo ? (
                  <img src={photo} alt="Pratinjau foto profil" />
                ) : (
                  <span aria-hidden="true">👤</span>
                )}
              </div>
              <div className="auth-photo-actions">
                <span className="auth-photo-label">Foto profil (opsional)</span>
                <input
                  id="signup-photo"
                  className="auth-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <label className="auth-photo-button" htmlFor="signup-photo">
                  Pilih foto
                </label>
                <small>{photoName || "Belum ada file dipilih"}</small>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                name="username"
                type="text"
                placeholder="Masukkan username"
                autoComplete="username"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-institution">Institution</label>
              <input
                id="signup-institution"
                name="institution"
                type="text"
                placeholder="Nama institusi"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-city">City</label>
              <input
                id="signup-city"
                name="city"
                type="text"
                placeholder="Nama kota"
                autoComplete="address-level2"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                placeholder="Buat password"
                autoComplete="new-password"
                required
              />
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button className="auth-submit" type="submit">
              Sign up
            </button>
          </form>

          <p className="auth-switch">
            Sudah punya akun? <Link to="/">Login</Link>
          </p>
        </section>
      </LampScene>
    </main>
  );
};

export default Signup;