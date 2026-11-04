import profileImage from "../assets/zzy.jpg";
import "../style/style.css";
import UserAvatar from "../components/UserAvatar";
import AccountDetails from "../components/AccountDetails";

const Account = ({ username }) => (
    <section className="profile-page">
        <div className="profile-card">
            <UserAvatar className="profile-page-avatar" fallback={profileImage} />
            <div>
                <p className="home-eyebrow">PROFIL PENGGUNA</p>
                <h2>{username || "Pengguna"}</h2>
                <p className="profile-page-description">
                    Profil akun Lost &amp; Found
                </p>
            </div>
        </div>
        <AccountDetails />
    </section>
);

export default Account;