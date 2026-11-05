import React, { useState } from 'react';

export default function PostPage({ username }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'lost',
    category: 'Elektronik',
    location: '',
    date: '',
    description: '',
    contact: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ambil data lama dari localStorage
    const existingPosts = JSON.parse(localStorage.getItem('lost_and_found_posts')) || [];
    
    const newPost = {
      ...formData,
      username,
      id: Date.now()
    };

    // Gabungkan data baru dengan data lama
    const updatedPosts = [newPost, ...existingPosts];
    
    // Simpan ke localStorage agar bisa dibaca di Beranda/Dashboard (Home.jsx)
    localStorage.setItem('lost_and_found_posts', JSON.stringify(updatedPosts));

    alert('Postingan berhasil dibuat dan dikirim ke Beranda!');
    
    // Reset form setelah disubmit
    setFormData({
      title: '',
      type: 'lost',
      category: 'Elektronik',
      location: '',
      date: '',
      description: '',
      contact: '',
      image: null
    });
  };

  return (
    <div style={{ padding: '30px', boxSizing: 'border-box', width: '100%', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginTop: 0, fontSize: '24px', color: '#333' }}>Buat Postingan Barang Hilang / Temuan</h1>

      <div style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#444' }}>Form Laporan Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Upload Foto Barang:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ ...inputStyle, padding: '6px', background: '#fafafa' }}
            />
          </div>
       
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Nama Pengguna / Nickname:</label>
            <input 
              type="text" 
              value={username} 
              readOnly
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Status:</label>
            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
              <option value="lost">Barang Hilang (Lost)</option>
              <option value="found">Barang Temuan (Found)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Nama Barang:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              placeholder="Contoh: Kunci Motor / HP" 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Kategori:</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Elektronik">Elektronik</option>
              <option value="Dompet & Tas">Dompet & Tas</option>
              <option value="Dokumen / Kartu">Dokumen / Kartu</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Lokasi:</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              placeholder="Contoh: Kantin / Area Parkir Kampus" 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Tanggal:</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px' }}>Deskripsi:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3" 
              placeholder="Ciri-ciri khusus barang..." 
              style={inputStyle}
            ></textarea>
          </div>

          <button type="submit" style={{ padding: '12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', marginTop: '10px' }}>
            Posting Laporan
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  fontSize: '14px'
};