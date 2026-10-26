import { useState } from "react";
import data from "../data.jsx/data.jsx";
import "../style/style.css";

const Home = ({ username }) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        const value = event.target.search.value.trim();
        setKeyword(value);
    };

    const filteredData = keyword
        ? data.filter((item) =>
            item.description.toLowerCase().includes(keyword.toLowerCase())
        )
        : data;

    return (
        <div className="home">
            <p>Halo, {username || "Pengguna"}!</p>
  

            <p>Temukan barang yang hilang atau laporkan barang yang ditemukan.</p>


            <form onSubmit={handleSearch} className="search-form">
                <input type="text" name="search" placeholder="Cari deskripsi..." />
                <button type="submit">Cari</button>
            </form>

            <div className="feed">
                {filteredData.length === 0 ? (
                    <p className="empty-state">Tidak ada postingan yang cocok.</p>
                ) : (
                    filteredData.map((item) => (
                        <div key={item.id} className="post-card">
                            <div className="post-header">
                                <img className="avatar" src={item.profileImage} alt={item.username} />
                                <strong>{item.username}</strong>
                            </div>

                            <img className="post-image" src={item.postImage} alt={item.username} />

                            <div className="post-actions">
                                <button>💬</button>
                                <button>✈</button>
                            </div>

                            <div className="post-caption">
                                <strong>{item.username}</strong>
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
