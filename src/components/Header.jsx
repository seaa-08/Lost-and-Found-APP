import profileImage from "../assets/zzy.jpg";
import Logoimg from "../assets/logo.jpeg";

const Header = ({ username }) => (
    <>
        <div className="dashboard-brand">
            <img src={Logoimg} alt="" className="dashboard-logo" />
            <span>L&F</span>
        </div>
        <header className="dashboard-header">
            <div>
                <p className="header-eyebrow">LOST & FOUND</p>
                <h1 id="title">Dashboard</h1>
            </div>
            <div className="head-profile">
                <span>{username || "Pengguna"}</span>
                <img src={profileImage} alt="" id="profile" />
            </div>
        </header>
    </>
);

export default Header;