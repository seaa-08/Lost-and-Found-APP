import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Account from "./Pages/Account";
import Setting from "./Pages/Setting";
import NotFound from "./Pages/NotFound";

import RequireAuth from "./components/RequireAuth";
import { getCurrentUser, updateCurrentUser } from "./auth/authStore";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState(
    () => window.localStorage.getItem("username") || ""
  );
          <Dashboard
            username={username}
            onSignOut={() => setUsername("")}
            darkMode={darkMode}
          />
          }
        >
          <Route index element={<Home username={username} doneChats={doneChats}/>} />

          <Route path="post" element={<Post username={username} />} />

          <Route path="chat" element={<Chat username={username} doneChats={doneChats} onDone={handleDone}/>} />
          <Route path="chat/:userId" element={<Chat username={username} doneChats={doneChats} onDone={handleDone}/>}/>

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;