import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                padding: "24px",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "24px",
                    padding: "48px 36px",
                    maxWidth: "480px",
                    width: "100%",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e2e8f0",
                }}
            >
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 20px",
                        borderRadius: "50%",
                        background: "#e0f2fe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0284c7",
                    }}
                >
                    <SearchOffIcon style={{ fontSize: 44 }} />
                </div>

                <h1
                    style={{
                        fontSize: "64px",
                        fontWeight: 800,
                        margin: "0 0 8px",
                        color: "#0f172a",
                        letterSpacing: "-2px",
                    }}
                >
                    404
                </h1>

                <h2
                    style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        margin: "0 0 12px",
                        color: "#334155",
                    }}
                >
                    Halaman Tidak Ditemukan
                </h2>

                <p
                    style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "#64748b",
                        margin: "0 0 28px",
                    }}
                >
                    Ups! Sepertinya barang atau halaman yang Anda cari terselip atau sudah dipindahkan.
                </p>

                <Button
                    variant="contained"
                    disableElevation
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/dashboard")}
                    style={{
                        background: "#0284c7",
                        color: "#ffffff",
                        padding: "10px 24px",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "15px",
                    }}
                >
                    Kembali ke Beranda
                </Button>
            </div>
        </main>
    );
};

export default NotFound;