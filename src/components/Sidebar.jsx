import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/setting">Setting</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;