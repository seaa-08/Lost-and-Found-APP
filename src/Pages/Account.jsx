import { useState } from "react";
import profileImage from "../assets/profil.jpg";
import "../style/style.css";
import UserAvatar from "../components/UserAvatar";
import AccountDetails from "../components/AccountDetails";
import Button from "@mui/material/Button";

const Account = ({ username }) => {
    // Mengambil postingan milik user yang sedang login dari localStorage
    const [myPosts, setMyPosts] = useState(() => {
        try {
            const allSaved = JSON.parse(localStorage.getItem("lost_and_found_posts")) || [];
            return allSaved.filter((post) => 
                (post.username || "Pengguna").toLowerCase() === (username || "pengguna").toLowerCase()
            );
        } catch {
            return [];
        }
    });

    const handleDeleteMyPost = (id) => {
        const updated = myPosts.filter((item) => item.id !== id);
        setMyPosts(updated);

        try {
            const allSaved = JSON.parse(localStorage.getItem("lost_and_found_posts")) || [];
            localStorage.setItem("lost_and_found_posts", JSON.stringify(allSaved.filter((item) => item.id !== id)));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section className="profile-page">
            <div className="profile-card">
                <UserAvatar className="profile-page-avatar" fallback={profileImage} />
                <div>
                    <p className="home-eyebrow">PROFIL {(username || "PENGGUNA").toUpperCase()}</p>
                    <h2>{username || "Pengguna"}</h2>
                    <p className="profile-page-description">
                        Profil akun Lost &amp; Found
                    </p>
                </div>
            </div>

            <AccountDetails />

            {/* Bagian Riwayat Postingan Saya */}
            <div style={{ marginTop: "32px", width: "100%", maxWidth: "800px" }}>
                <h3 style={{ fontSize: "18px", color: "#1e293b", marginBottom: "16px", fontWeight: 700 }}>
                    📋 Postingan Saya ({myPosts.length})
                </h3>

                {myPosts.length === 0 ? (
                    <div style={{
                        background: "#ffffff",
                        padding: "24px",
                        borderRadius: "12px",
                        textAlign: "center",
                        color: "#64748b",
                        border: "1px dashed #cbd5e1"
                    }}>
                        <p style={{ margin: 0 }}>Anda belum pernah membuat postingan barang hilang atau temuan.</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                        {myPosts.map((item) => {
                            const isLost = (item.type || "").toLowerCase() === "lost";
                            return (
                                <div key={item.id} style={{
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "16px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px"
                                }}>
                                    <span style={{
                                        alignSelf: "flex-start",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        padding: "3px 8px",
                                        borderRadius: "6px",
                                        backgroundColor: isLost ? "#fee2e2" : "#d1fae5",
                                        color: isLost ? "#dc2626" : "#059669"
                                    }}>
                                        {isLost ? "HILANG" : "TEMUAN"}
                                    </span>

                                    {item.image && (
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    )}

                                    <h4 style={{ margin: "4px 0", fontSize: "15px", color: "#0f172a" }}>{item.title}</h4>
                                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: 1.4 }}>{item.description}</p>
                                    
                                    <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: "11px", color: "#94a3b8" }}>{item.date || "Hari ini"}</span>
                                        <Button 
                                            size="small" 
                                            color="error" 
                                            variant="outlined" 
                                            onClick={() => handleDeleteMyPost(item.id)}
                                            style={{ textTransform: "none", fontSize: "11px", padding: "2px 8px", borderRadius: "6px" }}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Account;