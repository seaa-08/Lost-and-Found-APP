import React from "react";
import {Link} from "react-router-dom";

const Sidebar=()=>{

    return(
        <nav>
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/Pages/Post">Post</Link></li>
            <li><Link to="/Pages/Chat">Chat</Link></li>
            <li><Link to="/Pages/Account">Account</Link></li>
            <li><Link to="/Pages/Community">Community</Link></li>
        </nav>
    );
};

export default Sidebar;