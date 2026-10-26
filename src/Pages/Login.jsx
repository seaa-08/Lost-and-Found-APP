import { useState } from "react";
import "../style/login-style.css";
import { useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
 const [username, setUsername] = useState("");
 const navigate = useNavigate();
 const handleLogin = (e) => {
 e.preventDefault();
 onLogin(username);
 navigate("/dashboard");
 };
 return (
 <div className="login-container">
 <div className="login-form">
 <h2>Login</h2>
 <form onSubmit={handleLogin}>
 <input
 type="text"
 placeholder="Username"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 />
 <input type="password" placeholder="Password" />
 <button type="submit">Login</button>
 </form>
 <p>Belum punya akun? <a href="/signup">Daftar</a></p>
 </div>
 </div>
 );
};
export default Login