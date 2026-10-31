import { useState } from "react";
import data from "../data.jsx/data.jsx";
import "../style/style.css";

const Home = ({ username }) => {
    const [keyword, setKeyword] = useState("");
    const [reportCounts, setReportCounts] = useState({});

    const handleSearch = (event) => {
        event.preventDefault();
        const value = event.target.search.value.trim();
        setKeyword(value);
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
              item.description.toLowerCase().includes(keyword.toLowerCase())
          )
        : data;

    return (
        <div className="home">
            <div className="home-intro">
                <p className="home-eyebrow">SELAMAT DATANG</p>

                <h2 className="home-title">
                    Halo, {username || "Pengguna"}!
                </h2>

                <p className="home-description">
                    Barang hilang, Barang ditemukan, Kembali ke pemilik.
                </p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    name="search"
                    placeholder="Cari deskripsi barang..."
                />

                <button type="submit">Cari</button>
            </form>

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

                            <img
                                className="post-image"
                                src={item.postImage}
                                alt={item.description}
                            />

                            <div className="post-actions">
                                <button type="button" aria-label="Komentar">
                                    💬
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

                            <div className="post-caption">
                                <strong>{item.username}</strong>{" "}
                                <span>{item.description}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default Home;
