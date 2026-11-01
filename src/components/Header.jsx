import { Badge, IconButton, Popover } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logoimg from "../assets/logo.jpeg";

const initialNotifications = [
    {
        id: 1,
        type: "chat",
        title: "Pesan baru dari Ding0202",
        message: "Kunci yang ditemukan mungkin milikmu.",
        time: "Baru saja",
        to: "/dashboard/chat",
        read: false,
    },
    {
        id: 2,
        type: "post",
        title: "Postingan baru di komunitas",
        message: "Dompet kuning dilaporkan hilang di kantin kampus.",
        time: "5 menit lalu",
        to: "/dashboard",
        read: false,
    },
];

const Header = ({ menuOpen, onMenuToggle, darkMode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(initialNotifications);
    const [notificationAnchor, setNotificationAnchor] = useState(null);
    const pageTitles = {
        "/dashboard": "Beranda",
        "/dashboard/post": "Post",
        "/dashboard/chat": "Chat",
        "/dashboard/account": "Profil",
        "/dashboard/setting": "Pengaturan",
    };
    const title = pageTitles[pathname] || "Dashboard";
    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const handleNotificationClick = (notification) => {
        setNotifications((current) =>
            current.map((item) =>
                item.id === notification.id ? { ...item, read: true } : item
            )
        );
        setNotificationAnchor(null);
        navigate(notification.to);
    };

    return (
        <>
            <div className="dashboard-brand">
                <img src={Logoimg} alt="" className="dashboard-logo" />
                <span>L&F</span>
            </div>
            <header className="dashboard-header">
                <div className="dashboard-header-title">
                    <IconButton
                        className="dashboard-menu-toggle"
                        onClick={onMenuToggle}
                        aria-label={menuOpen ? "Sembunyikan menu" : "Tampilkan menu"}
                        aria-expanded={menuOpen}
                        aria-controls="dashboard-sidebar"
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <div>
                        <p className="header-eyebrow">LOST & FOUND</p>
                        <h1 id="title">{title}</h1>
                    </div>
                </div>
                <IconButton
                    className="notification-button"
                    aria-label={`Notifikasi, ${unreadCount} belum dibaca`}
                    aria-haspopup="dialog"
                    aria-expanded={Boolean(notificationAnchor)}
                    onClick={(event) =>
                        setNotificationAnchor(event.currentTarget)
                    }
                >
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>
            </header>
            <Popover
                open={Boolean(notificationAnchor)}
                anchorEl={notificationAnchor}
                onClose={() => setNotificationAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    className: `notification-popover${darkMode ? " dark-mode-popover" : ""}`,
                }}
            >
                <div className="notification-heading">
                    <h2>Notifikasi</h2>
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            onClick={() =>
                                setNotifications((current) =>
                                    current.map((item) => ({
                                        ...item,
                                        read: true,
                                    }))
                                )
                            }
                        >
                            Tandai dibaca
                        </button>
                    )}
                </div>
                {notifications.length > 0 ? (
                    <div className="notification-list">
                        {notifications.map((notification) => {
                            const NotificationIcon =
                                notification.type === "chat"
                                    ? ChatBubbleOutlineOutlinedIcon
                                    : ArticleOutlinedIcon;

                            return (
                                <button
                                    type="button"
                                    key={notification.id}
                                    className={`notification-item${notification.read ? "" : " unread"}`}
                                    onClick={() =>
                                        handleNotificationClick(notification)
                                    }
                                >
                                    <span className="notification-icon">
                                        <NotificationIcon fontSize="small" />
                                    </span>
                                    <span className="notification-copy">
                                        <strong>{notification.title}</strong>
                                        <span>{notification.message}</span>
                                        <small>{notification.time}</small>
                                    </span>
                                    {!notification.read && (
                                        <span className="notification-unread-dot" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p className="notification-empty">
                        Belum ada notifikasi.
                    </p>
                )}
            </Popover>
        </>
    );
};

export default Header;