import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../style/style.css";
import LogoutNotice from "./LogoutNotice";
import { deleteCurrentAccount } from "../auth/authStore";

const Dashboard = ({ username, onSignOut, darkMode }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(
        () => window.matchMedia("(min-width: 761px)").matches
    );

    const [showLogoutNotice, setShowLogoutNotice] = useState(false);

    const handleSignOut = () => setShowLogoutNotice(true);

    const confirmSignOut = () => {
        setShowLogoutNotice(false);
        deleteCurrentAccount();
        onSignOut();
        navigate("/");
    };

    return (
        <div
            className={`container${menuOpen ? "" : " menu-collapsed"}${darkMode ? " dark-mode" : ""}`}
        >
            <Header
                menuOpen={menuOpen}
                onMenuToggle={() => setMenuOpen((open) => !open)}
                darkMode={darkMode}
            />
            <Sidebar username={username} onSignOut={handleSignOut} />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
            <LogoutNotice
                open={showLogoutNotice}
                darkMode={darkMode}
                onConfirm={confirmSignOut}
                onCancel={() => setShowLogoutNotice(false)}
            />
        </div>
    );
};

export default Dashboard;