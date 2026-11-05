import { useSyncExternalStore } from "react";

const ACCOUNTS_KEY = "lf_accounts";
const CURRENT_KEY = "lf_current_id";

// Akun demo bawaan (selalu ada, tidak ikut terhapus)
const DEMO_ACCOUNT = {
  id: "demo",
  username: "user",
  password: "1111",
  email: "",
  institution: "",
  city: "",
  photo: "",
};

let version = 0;
const listeners = new Set();

const notify = () => {
  version += 1;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const readStored = () => {
  try {
    return JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
};

const writeStored = (accounts) => {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    return true;
  } catch {
    return false;
  }
};

const normalize = (text) => String(text).trim().toLowerCase();

const getAccounts = () => [DEMO_ACCOUNT, ...readStored()];

const setCurrent = (id) => {
  window.localStorage.setItem(CURRENT_KEY, id);
  notify();
};

export const getCurrentUser = () => {
  const id = window.localStorage.getItem(CURRENT_KEY);
  return getAccounts().find((account) => account.id === id) || null;
};

export const registerAccount = ({
  username,
  email,
  institution,
  city,
  password,
  photo,
}) => {
  const name = String(username).trim();

  if (getAccounts().some((a) => normalize(a.username) === normalize(name))) {
    return { ok: false, error: "Username sudah dipakai. Coba username lain." };
  }

  const account = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    username: name,
    email: String(email).trim(),
    institution: String(institution).trim(),
    city: String(city).trim(),
    password,
    photo: photo || "",
  };

  if (!writeStored([...readStored(), account])) {
    return { ok: false, error: "Gagal menyimpan akun. Coba pakai foto lain." };
  }

  setCurrent(account.id);
  return { ok: true, account };
};

export const loginAccount = (username, password) => {
  const account = getAccounts().find(
    (a) => normalize(a.username) === normalize(username) && a.password === password
  );

  if (!account) {
    return { ok: false, error: "Username atau password salah." };
  }

  setCurrent(account.id);
  return { ok: true, account };
};

export const updateCurrentUser = (patch) => {
  const id = window.localStorage.getItem(CURRENT_KEY);
  if (!id || id === "demo") return; // akun demo tidak disimpan permanen

  writeStored(readStored().map((a) => (a.id === id ? { ...a, ...patch } : a)));
  notify();
};

// Dipakai saat logout: akun dihapus, seperti akun tamu
export const deleteCurrentAccount = () => {
  const id = window.localStorage.getItem(CURRENT_KEY);
  writeStored(readStored().filter((a) => a.id !== id));
  window.localStorage.removeItem(CURRENT_KEY);
  notify();
};

export const useCurrentUser = () => {
  useSyncExternalStore(subscribe, () => version);
  return getCurrentUser();
};

// Foto dipotong persegi & dikecilkan agar muat di localStorage
export const fileToAvatar = (file, size = 256) =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File harus berupa gambar."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Gambar tidak valid."));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        canvas
          .getContext("2d")
          .drawImage(
            img,
            (img.width - side) / 2,
            (img.height - side) / 2,
            side,
            side,
            0,
            0,
            size,
            size
          );
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });