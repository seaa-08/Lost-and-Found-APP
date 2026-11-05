import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import data from "../data.jsx/data";
import { autoReplies, fallback } from "../data.jsx/autoReplies";
import "../style/style.css";
import "../style/typing.css";

const CURRENT_USER_ID = 0;
const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

const getTime = () =>
    new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

const normalize = (s) => s.toLowerCase().trim();

const TypingIndicator = () => (
    <div className="typing-bubble">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
    </div>
);

const Chat = ({ username, doneChats = {}, onDone }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userPosts] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("lost_and_found_posts")) || [];
        } catch {
            return [];
        }
    });

    const [messages, setMessages] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("messages")) || {};
        } catch {
            return {};
        }
    });
    const [text, setText] = useState("");
    const [typingUsers, setTypingUsers] = useState({});
    const [image, setImage] = useState([]); 
    const [error, setError] = useState("");
    const reference = useRef(null);
    const fileRef = useRef(null);
    const activeId = Number(userId);
    const postUsers = userPosts.map((post) => ({
        id: post.id,
        username: post.username || "Pengguna",
        profileImage: data[0].profileImage,
        postImage: post.image || "",
        category: post.title || post.category || "Postingan",
        location: post.location || "",
        status: post.type || "lost",
    }));
    const chatUsers = [...data, ...postUsers].filter(
        (user) => user.username !== username || (messages[user.id] || []).length > 0
    );
    const activeUser = chatUsers.find((u) => u.id === activeId);
    const activeMessages = messages[activeId] || [];
    const isDone = !!doneChats[activeId];
    const currentStatus = isDone ? "found" : activeUser?.status;

    useEffect(() => {
        try {
            localStorage.setItem("messages", JSON.stringify(messages));
        } catch {
            setError("Penyimpanan penuh, pesan baru tidak tersimpan.");
        }
    }, [messages]);

    useEffect(() => {
        reference.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeId, activeMessages.length, typingUsers]);

    const handleDoneClick = () => {
        const konfirmasi = window.confirm("Yakin tandai chat ini selesai?")
        if (konfirmasi) {
            onDone(activeId);
        }
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("File harus berupa gambar.");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            setError("Ukuran gambar maksimal 1 MB.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImage((prev) => [...prev, { name: file.name, url: reader.result }]);
        };
        reader.readAsDataURL(file);

        setError("");
        e.target.value = "";
    };

    const handleSend = (e) => {
        e.preventDefault();
        const userText = text.trim();
        if ((!userText && image.length === 0) || !activeUser) return;

        const targetId = activeId;

        const newMessage = {
            id: Date.now(),
            senderId: username || CURRENT_USER_ID,
            receiverId: targetId,
            text: userText,
            time: getTime(),
            timestamp: Date.now(),
            images: image.map((item) => item.url),
        };
        setMessages((prev) => ({
            ...prev,
            [targetId]: [...(prev[targetId] || []), newMessage],
        }));

        const replies = autoReplies[targetId];
        const found = replies?.find((item) =>
            normalize(userText).includes(item.keyword)
        );

        if (replies) {
            const replyText = found ? found.reply : fallback;
            setTypingUsers((prev) => ({ ...prev, [targetId]: (prev[targetId] || 0) + 1 }));

            setTimeout(() => {
                const replyMessage = {
                    id: Date.now() + 1,
                    senderId: targetId,
                    receiverId: username || CURRENT_USER_ID,
                    text: replyText,
                    time: getTime(),
                    timestamp: Date.now(),
                };
                setMessages((prev) => ({
                    ...prev,
                    [targetId]: [...(prev[targetId] || []), replyMessage],
                }));
                setTypingUsers((prev) => ({
                    ...prev,
                    [targetId]: Math.max((prev[targetId] || 1) - 1, 0),
                }));
            }, 1000);
        }

        setText("");
        setImage([]);
    };

    const getLastMessage = (id) => {
        const last = (messages[id] || []).at(-1);
        if (!last) return "Belum ada pesan";
        return last.text || "Gambar";
    };

    const getLastMessageTime = (id) => (messages[id] || []).at(-1)?.time || "";

    const sortedChats = [...chatUsers].sort((a, b) => {
        const lastA = messages[a.id]?.at(-1);
        const lastB = messages[b.id]?.at(-1);
        return (lastB?.timestamp ?? 0) - (lastA?.timestamp ?? 0);
    });

    const handleRemoveImage = (index) => {
        setImage((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className={`chat-page ${userId ? "chat-open" : ""}`}>
            <aside className="chat-list">
                <h3 className="chat-list-title">Chat</h3>
                {sortedChats.map((user) => (
                    <button
                        key={user.id}
                        type="button"
                        className={`chat-list-item ${user.id === activeId ? "active" : ""}`}
                        onClick={() => navigate(`/dashboard/chat/${user.id}`)}
                    >
                        <img className="avatar" src={user.profileImage} alt={user.username} />
                        <div className="chat-list-copy">
                            <strong>{user.username}</strong>
                            <span>{getLastMessage(user.id)}</span>
                            <span>{getLastMessageTime(user.id)}</span>
                        </div>
                    </button>
                ))}
            </aside>

            <section className="chat-window">
                {!activeUser ? (
                    <p className="chat-placeholder">Tekan chat untuk mulai ngobrol.</p>
                ) : (
                    <>
                        <header className="chat-window-header">
                            <button
                                type="button"
                                className="chat-back"
                                aria-label="Kembali"
                                onClick={() => navigate("/dashboard/chat")}
                            >
                                <ArrowBackIcon fontSize="small" />
                            </button>
                            <img className="avatar" src={activeUser.profileImage} alt={activeUser.username} />
                            <strong>{activeUser.username}</strong>
                        </header>

                        <div className="chat-product">
                            <img src={activeUser.postImage} alt={activeUser.category} />
                            <div>
                                <strong>{activeUser.category}</strong>
                                <span>{activeUser.location}</span>
                            </div>
                            <span className={`post-status-inline post-status-${currentStatus}`}>
                                {currentStatus === "lost" ? "LOST" : "FOUND"}
                            </span>
                            {!isDone && (
                                <button
                                    type="button"
                                    className="chat-done-btn"
                                    onClick={handleDoneClick}
                                >
                                    Tandai Selesai
                                </button>
                            )}
                        </div>

                        <div className="chat-messages">
                            {activeMessages.length === 0 && (
                                <p className="chat-placeholder">
                                    Mulai percakapan dengan {activeUser.username}
                                </p>
                            )}

                            {activeMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chat-bubble ${
                                        message.senderId === username ||
                                        message.senderId === CURRENT_USER_ID
                                            ? "me"
                                            : "them"
                                    }`}
                                >
                                    {message.images?.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt="Lampiran gambar"
                                            className="chat-image"
                                        />
                                    ))}
                                    {message.text && <p>{message.text}</p>}
                                    <small>{message.time}</small>
                                </div>
                            ))}

                            {!!typingUsers[activeId] && <TypingIndicator />}
                            <div ref={reference} />
                        </div>

                        {(error || image.length > 0) && (
                        <div className="chat-attachments">
                            {error && <p className="error">{error}</p>}
                            {image.map((img, index) => (
                            <div key={index} className="chat-preview-wrap">
                            <img src={img.url} alt={img.name} className="chat-preview" />
                            <button
                                type="button"
                                className="chat-preview-remove"
                                aria-label="Hapus gambar"
                                onClick={() => handleRemoveImage(index)}
                            >
                                ×
                            </button>
                        </div>
                            ))}
                        </div>
                        )}

                        <form className="chat-input" onSubmit={handleSend}>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImage}
                            />
                            <button
                                type="button"
                                aria-label="Lampirkan gambar"
                                onClick={() => fileRef.current.click()}
                            >
                                <AttachFileIcon fontSize="small" />
                            </button>
                            <input
                                type="text"
                                placeholder="Tulis pesan..."
                                aria-label="Tulis pesan"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button type="submit" aria-label="Kirim">
                                <SendIcon fontSize="small" />
                            </button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
};

export default Chat;