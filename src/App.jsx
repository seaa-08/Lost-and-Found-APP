import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Setting from "./Pages/Setting";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const DashboardPlaceholder = ({ title }) => (
  <section className="dashboard-placeholder">
    <p className="home-eyebrow">L&F LOST AND FOUND</p>
    <h2>{title}</h2>
  </section>
);

const App = () => {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setUsername} />} />
        <Route path="/signup" element={<Signup onSignup={setUsername} />} />
        <Route path="/dashboard" element={<Dashboard username={username} />}>
          <Route index element={<Home username={username} />} />
          <Route path="post" element={<DashboardPlaceholder title="Post" />} />
          <Route path="chat" element={<DashboardPlaceholder title="Chat" />} />
          <Route path="account" element={<DashboardPlaceholder title="Akun" />} />
          <Route
            path="setting"
            element={<Setting username={username} onUsernameChange={setUsername} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;