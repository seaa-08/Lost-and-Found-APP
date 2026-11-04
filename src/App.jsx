import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Account from "./Pages/Account";
import Setting from "./Pages/Setting";
import RequireAuth from "./components/RequireAuth";
import { getCurrentUser, updateCurrentUser } from "./auth/authStore";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState(() => getCurrentUser()?.username || "");
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    window.localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setUsername} />} />

        <Route
          path="/signup"
          element={<Signup onSignup={setUsername} />}
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard
                username={username}
                onSignOut={() => setUsername("")}
                darkMode={darkMode}
              />
            </RequireAuth>
          }
        >
          <Route index element={<Home username={username} />} />

          <Route path="post" element={<Post />} />

          <Route path="chat" element={<Chat />} />

          <Route path="account" element={<Account username={username} />} />

          <Route
            path="setting"
            element={
              <Setting
                username={username}
                onUsernameChange={(name) => {
                  updateCurrentUser({ username: name });
                  setUsername(name);
                }}
                darkMode={darkMode}
                onDarkModeChange={setDarkMode}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;