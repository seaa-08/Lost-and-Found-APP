import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./style.css";

const Dashboard = () => {
    return (
        <div className="container">
            <Header />
            <Sidebar />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;