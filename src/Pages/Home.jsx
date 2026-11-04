import React, { useState, useEffect } from "react";
import data from "../data.jsx/data.jsx";
import "../style/style.css";

const Home = () => {
    const [keyword, setKeyword] = useState("");
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('lost_and_found_posts')) || [];
        
        const formattedSavedPosts = savedPosts.map(post => ({
            id: post.id,
            username: post.username || "Pengguna",
            profileImage: "https://via.placeholder.com/40", 
            postImage: post.image || "", 
            title: post.title,
            status: post.type === 'lost' ? 'HILANG' : 'TEMUAN',
            location: post.location,
            contact: post.contact,
            description: post.description,
            isUserPost: true 
        }));

        setAllPosts([...formattedSavedPosts, ...data]);
    }, []);

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

    const filteredData = keyword
        ? allPosts.filter((item) => {
            const desc = item.description ? String(item.description).toLowerCase() : "";
            const title = item.title ? String(item.title).toLowerCase() : "";
            const username = item.username ? String(item.username).toLowerCase() : "";
            const query = keyword.toLowerCase();

            return desc.includes(query) || title.includes(query) || username.includes(query);
          })
        : allPosts;

    return (
        <div className="home">
            <p>Temukan barang yang hilang atau laporkan barang yang ditemukan.</p>

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" name="search" placeholder="Cari deskripsi / nama barang..." />
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

                            {item.postImage && (
                                <img className="post-image" src={item.postImage} alt={item.username} />
                            )}

                            <div className="post-actions">
                                <button>💬</button>
                                <button>✈️</button>
                            </div>

                            <div className="post-caption" style={{ padding: '0 15px' }}>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                                    <span style={{ 
                                        padding: '2px 6px', 
                                        borderRadius: '4px', 
                                        color: 'white', 
                                        fontSize: '11px', 
                                        fontWeight: 'bold',
                                        background: item.status === 'HILANG' ? '#d9534f' : '#5cb85c',
                                        marginRight: '8px'
                                    }}>
                                        {item.status || 'INFO'}
                                    </span>
                                    <strong>{item.title || item.username}</strong>
                                </p>
                                <p style={{ margin: '4px 0', fontSize: '13px', color: '#444' }}>{item.description}</p>
                                {item.location && <p style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>📍 Lokasi: {item.location}</p>}
                                {item.contact && <p style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>📞 Kontak: {item.contact}</p>}
                            </div>

                            {item.isUserPost && (
                                <button 
                                    onClick={() => handleDelete(item.id)} 
                                    style={{ marginTop: '12px', marginLeft: '15px', marginBottom: '15px', padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                                >
                                    Hapus Postingan
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;