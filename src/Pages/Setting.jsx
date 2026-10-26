
import "../style/style.css";

const Setting = ({ username, onUsernameChange }) => {
  const handleSave = (event) => {
    event.preventDefault();
    const newUsername = event.currentTarget.elements.name.value.trim();

    if (newUsername) {
      onUsernameChange(newUsername);
    }

    alert("Pengaturan tersimpan");
  };

  return (
    <div className="settings-page">
      <form className="settings" onSubmit={handleSave}>
        <h2>Pengaturan</h2>

        <section className="settings-section">
          <h3>Profil</h3>
          <label htmlFor="name">Nama</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nama pengguna"
            defaultValue={username}
            required
          />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="nama@email.com" />

          <label htmlFor="phone">Nomor HP</label>
          <input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
        </section>

        <section className="settings-section">
          <h3>Preferensi</h3>
          <label className="settings-option">
            <input type="checkbox" />
            Notifikasi barang
          </label>
          <label className="settings-option">
            <input type="checkbox" />
            Notifikasi pesan
          </label>
          <label className="settings-option">
            <input type="checkbox" />
            Tampilkan profil
          </label>
        </section>

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default Setting;

