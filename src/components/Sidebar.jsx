import {Link} from "react-router-dom";

const Sidebar=()=>{

    return(
        <nav>
            <li><Link to="/Dashboard">Beranda</Link></li>
            <li><Link to="/Pages/Post">Post</Link></li>
            <li><Link to="/Pages/Chat">Chat</Link></li>
            <li><Link to="/Pages/Account">Account</Link></li>
            <li><Link to="/dashboard/setting">Setting</Link></li>
        </nav>
    );
};

export default Sidebar;