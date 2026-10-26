import "../style/style.css";
import profileImage from "../assets/zzy.jpg";
import Logoimg from "../assets/logo.jpeg";

const Header=({ username })=>{
    return(
        <>
        <header>
            <h1 id="title">L&F Lost and Found</h1>
            <div className="head-profile">
            <p>{username || "Username"}</p>
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