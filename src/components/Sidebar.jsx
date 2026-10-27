import { NavLink } from "react-router-dom";

const Sidebar = () => (
    <aside className="dashboard-sidebar">
        <p className="sidebar-label">MENU</p>
        <nav className="dashboard-nav" aria-label="Menu utama">
            <NavLink to="/dashboard" end className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">⌂</span>
                <span>Beranda</span>
            </NavLink>
            <NavLink to="/dashboard/post" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">＋</span>
                <span>Post</span>
            </NavLink>
            <NavLink to="/dashboard/chat" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">✉</span>
                <span>Chat</span>
            </NavLink>
            <NavLink to="/dashboard/account" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">◉</span>
                <span>Akun</span>
            </NavLink>
            <NavLink to="/dashboard/setting" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">⚙</span>
                <span>Pengaturan</span>
            </NavLink>
        </nav>
        <p className="sidebar-help">Temukan barang, bantu kembalikan kepada pemiliknya.</p>
    </aside>
);

export default Sidebar;