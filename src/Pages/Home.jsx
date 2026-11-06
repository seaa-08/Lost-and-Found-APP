import { useState } from "react";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import Report from "../components/Report";
import data from "../data.jsx/data.jsx";
import "../style/style.css";

const getInitialPosts = () => {
    const savedPosts = JSON.parse(localStorage.getItem("lost_and_found_posts")) || [];
    const formattedSavedPosts = savedPosts.map((post) => ({
        id: post.id,
        username: post.username || "Pengguna",
        profileImage: "https://via.placeholder.com/40",
        postImage: post.image || "",
        title: post.title,
        category: post.category,
        status: post.type === "lost" ? "HILANG" : "TEMUAN",
        location: post.location,
        date: post.date,
        contact: post.contact,
        description: post.description,
        characteristics: post.characteristics,
        isUserPost: true,
    }));

    return [...formattedSavedPosts, ...data];
};

const Home = ({ username }) => {
    const [keyword, setKeyword] = useState("");
    const [filterType, setFilterType] = useState("all"); // 'all' | 'lost' | 'found'
    const [allPosts, setAllPosts] = useState(getInitialPosts);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        const updatedPosts = allPosts.filter((item) => item.id !== id);
        setAllPosts(updatedPosts);
        
        const currentSaved = JSON.parse(localStorage.getItem('lost_and_found_posts')) || [];
        localStorage.setItem('lost_and_found_posts', JSON.stringify(currentSaved.filter(item => item.id !== id)));
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const value = event.target.search.value.trim();
        setKeyword(value);
    };

    const filteredData = allPosts.filter((item) => {
        const isLost = ["lost", "hilang"].includes(
            String(item.status || item.type || "").toLowerCase()
        );

        // Filter berdasarkan tab type
        if (filterType === "lost" && !isLost) return false;
        if (filterType === "found" && isLost) return false;

        // Filter berdasarkan search query
        if (keyword) {
            const desc = item.description ? String(item.description).toLowerCase() : "";
            const title = item.title ? String(item.title).toLowerCase() : "";
            const author = item.username ? String(item.username).toLowerCase() : "";
            const category = item.category ? String(item.category).toLowerCase() : "";
            const location = item.location ? String(item.location).toLowerCase() : "";
            const query = keyword.toLowerCase();

            return desc.includes(query) || title.includes(query) || author.includes(query) || category.includes(query) || location.includes(query);
        }

        return true;
    });

    return (
        <div className="home">
            <p>Temukan barang yang hilang atau laporkan barang yang ditemukan.</p>

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" name="search" placeholder="Cari deskripsi / nama barang..." />
                <Button type="submit" variant="contained" disableElevation className="search-submit-button">
                    Cari
                </Button>
            </form>

            {/* Quick Filter Tabs */}
            <div style={{ display: "flex", gap: "10px", margin: "16px 0 24px", flexWrap: "wrap" }}>
                <Button
                    variant={filterType === "all" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setFilterType("all")}
                    style={{
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: filterType === "all" ? "#0284c7" : "transparent",
                        borderColor: "#0284c7",
                        color: filterType === "all" ? "#ffffff" : "#0284c7"
                    }}
                >
                    Semua ({allPosts.length})
                </Button>
                <Button
                    variant={filterType === "lost" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setFilterType("lost")}
                    style={{
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: filterType === "lost" ? "#ef4444" : "transparent",
                        borderColor: "#ef4444",
                        color: filterType === "lost" ? "#ffffff" : "#ef4444"
                    }}
                >
                    🔍 Hilang (Lost)
                </Button>
                <Button
                    variant={filterType === "found" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setFilterType("found")}
                    style={{
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: filterType === "found" ? "#10b981" : "transparent",
                        borderColor: "#10b981",
                        color: filterType === "found" ? "#ffffff" : "#10b981"
                    }}
                >
                    📦 Ditemukan (Found)
                </Button>
            </div>

            <div className="feed">
                {filteredData.length === 0 ? (
                    <p className="empty-state">Tidak ada postingan yang cocok.</p>
                ) : (
                    filteredData.map((item) => {
                        const isLost = ["lost", "hilang"].includes(
                            String(item.status || item.type || "").toLowerCase()
                        );

                        return (
                        <div key={item.id} className="post-card">
                            <span className={`post-status ${isLost ? "post-status-lost" : "post-status-found"}`}>
                                {isLost ? "LOST" : "FOUND"}
                            </span>
                            <div className="post-header">
                                <img className="avatar" src={item.profileImage} alt={item.username} />
                                <strong>{item.username}</strong>
                            </div>

                            {item.postImage && (
                                <img className="post-image" src={item.postImage} alt={item.username} />
                            )}

                            <div className="post-actions">
                                <Button
                                    type="button"
                                    variant="text"
                                    className="post-comment-button"
                                    aria-label={`Chat dengan ${item.username}`}
                                    title={item.username === username ? "Ini postingan Anda" : `Chat dengan ${item.username}`}
                                    disabled={item.username === username}
                                    onClick={() => navigate(`/dashboard/chat/${item.id}`)}
                                >
                                    <ChatBubbleOutlineIcon fontSize="small" />
                                </Button>
                                <Report postId={item.id} username={username} />
                            </div>

                            <div className="post-caption">
                                <p className="post-caption-title">
                                    <strong>{item.title || item.username}</strong>
                                </p>
                                {item.description && (
                                    <p className="post-caption-description">
                                        {item.description}
                                    </p>
                                )}
                            </div>

                            <dl className="post-details">
                                {item.category && (
                                    <div className="post-detail">
                                        <dt>Kategori</dt>
                                        <dd>{item.category}</dd>
                                    </div>
                                )}
                                {item.location && (
                                    <div className="post-detail">
                                        <dt>Lokasi</dt>
                                        <dd>{item.location}</dd>
                                    </div>
                                )}
                                {item.date && (
                                    <div className="post-detail">
                                        <dt>Tanggal</dt>
                                        <dd>{item.date}</dd>
                                    </div>
                                )}
                                {item.characteristics && (
                                    <div className="post-detail">
                                        <dt>Ciri-ciri</dt>
                                        <dd>{item.characteristics}</dd>
                                    </div>
                                )}
                                {item.contact && (
                                    <div className="post-detail">
                                        <dt>Kontak</dt>
                                        <dd>{item.contact}</dd>
                                    </div>
                                )}
                            </dl>

                            {item.isUserPost && (
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    disableElevation
                                    onClick={() => handleDelete(item.id)}
                                    sx={{
                                        mt: 1.5,
                                        ml: 1.875,
                                        mb: 1.875,
                                        textTransform: "none",
                                    }}
                                >
                                    Hapus Postingan
                                </Button>
                            )}
                        </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Home;