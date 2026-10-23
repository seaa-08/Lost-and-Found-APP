import Dashboard from "./components/Dashboard";
import Home from "./Pages/Home";
import Post from "./Pages/Post"
import Chat from "./Pages/Chat"
import Account from "./Pages/Account";
import Setting from "./Pages/Setting";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="post" element={<Post />} />
          <Route path="chat" element={<Chat />} />
          <Route path="account" element={<Account />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;