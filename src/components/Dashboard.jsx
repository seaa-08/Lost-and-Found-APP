import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../style/style.css";

const Dashboard = ({ username }) => {
    return (
        <div className="container">
            <Header username={username} />
            <Sidebar />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;