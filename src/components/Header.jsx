import React from "react";
import "./style.css";
import profileImage from "../assets/zzy.jpg";
import Logoimg from "../assets/logo.jpeg";

const Header=()=>{
    return(
        <>
        <header>
            <h1 id="title">L&F Lost and Found</h1>
            <div className="head-profile">
            <p>Username</p>
            <img src={profileImage} alt="profile" id="profile" />
            </div>
        </header>

        <logo>
            <img src={Logoimg} alt="logo" id="logo" />
            <p>L&F</p>
        </logo>
        </>
    )

}

export default Header;