import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import data from "../data.jsx/data.jsx";
import "../style/style.css";

const Home = ({ username }) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [reportCounts, setReportCounts] = useState({});

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const handleReport = (postId) => {
        const confirmed = window.confirm("Yakin ingin melaporkan postingan ini?");
        if (confirmed) {
            setReportCounts((counts) => ({
                ...counts,
                [postId]: (counts[postId] || 0) + 1,
            }));
        }
    };

    const filteredData = keyword
        ? data.filter((item) =>
              [
                  item.category,
                  item.location,
                  item.characteristics,
                  item.description,
              ].some((value) =>
                  value.toLowerCase().includes(keyword.toLowerCase())
              )
          )
        : data;

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form" role="search">
                <input
                    type="search"
                    name="search"
                    aria-label="Cari postingan"
                    placeholder="Cari deskripsi barang..."
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                />

                <button type="submit">Cari</button>
            </form>

            <div className="home-intro">
                <p className="home-eyebrow">SELAMAT DATANG</p>

                <h2 className="home-title">
                    Halo, {username || "Pengguna"}! Temukan barangmu.
                </h2>

                <p className="home-description">
                    Cari barang yang hilang atau bantu pemilik menemukan
                    barangnya kembali dengan membagikan barang temuanmu.
                </p>

                <button
                    className="home-post-button"
                    type="button"
                    onClick={() => navigate("/dashboard/post")}
                >
                    Buat Postingan
                </button>
            </div>

            <div className="feed-heading">
                <h3>Postingan terbaru</h3>
                <span>{filteredData.length} postingan</span>
            </div>

            <div className="feed">
                {filteredData.length === 0 ? (
                    <p className="empty-state">
                        Tidak ada postingan yang cocok.
                    </p>
                ) : (
                    filteredData.map((item) => (
                        <div key={item.id} className="post-card">
                            <div className="post-header">
                                <img
                                    className="avatar"
                                    src={item.profileImage}
                                    alt={item.username}
                                />

                                <strong>{item.username}</strong>
                            </div>

                            <div className="post-image-wrap">
                                <img
                                    className="post-image"
                                    src={item.postImage}
                                    alt={item.description}
                                />
                                <span
                                    className={`post-status post-status-${item.status}`}
                                >
                                    {item.status === "lost" ? "LOST" : "FOUND"}
                                </span>
                            </div>

                            <dl className="post-details">
                                <div className="post-detail">
                                    <dt>Kategori</dt>
                                    <dd>{item.category}</dd>
                                </div>
                                <div className="post-detail">
                                    <dt>Lokasi</dt>
                                    <dd>{item.location}</dd>
                                </div>
                                <div className="post-detail">
                                    <dt>Ciri-ciri</dt>
                                    <dd>{item.characteristics}</dd>
                                </div>
                            </dl>

                            <div className="post-actions">
                                <button type="button" aria-label="Chat">
                                    <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                                </button>
                                <button
                                    type="button"
                                    className="post-report"
                                    onClick={() => handleReport(item.id)}
                                    aria-label={`Laporkan postingan, ${reportCounts[item.id] || 0} laporan`}
                                >
                                    ⚑ <span>Laporkan</span>
                                    <span className="report-count">
                                        {reportCounts[item.id] || 0}
                                    </span>
                                </button>
                            </div>

                            {!(
                                item.category &&
                                item.location &&
                                item.characteristics
                            ) && (
                                <div className="post-caption">
                                    <strong>{item.username}</strong>{" "}
                                    <span>{item.description}</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default Home;
