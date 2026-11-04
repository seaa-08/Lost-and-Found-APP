import { useEffect, useRef, useState } from "react";
import "../style/lamp.css";

const isDarkMode = () => {
    try {
        return window.localStorage.getItem("darkMode") === "true";
    } catch {
        return false;
    }
};

const LampScene = ({ children }) => {
    const [isOn, setIsOn] = useState(false);
    const [pulling, setPulling] = useState(false);
    const [dark] = useState(isDarkMode);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const toggleLamp = () => {
        setIsOn((prev) => !prev);
        setPulling(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setPulling(false), 200);
    };

    return (
        <div className={`lamp-scene ${isOn ? "is-on" : ""} ${dark ? "lamp-dark" : ""}`}>
            <div className="lamp-side">
                <button
                    type="button"
                    className="lamp-button"
                    onClick={toggleLamp}
                    aria-pressed={isOn}
                    aria-label={isOn ? "Matikan lampu" : "Nyalakan lampu"}
                >
                    <svg className="lamp-svg" viewBox="-30 0 260 320" aria-hidden="true">
                        <defs>
                            <linearGradient id="lampBeam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" className="beam-stop-start" />
                                <stop offset="100%" className="beam-stop-end" />
                            </linearGradient>
                        </defs>

                        {/* cahaya */}
                        <polygon
                            className="lamp-beam"
                            points="32,152 168,152 225,300 -25,300"
                            fill="url(#lampBeam)"
                        />

                        {/* alas & tiang */}
                        <ellipse className="lamp-metal" cx="100" cy="282" rx="52" ry="11" />
                        <rect className="lamp-metal" x="95" y="150" width="10" height="132" />

                        {/* tali */}
                        <g className={`lamp-cord ${pulling ? "is-pulled" : ""}`}>
                            <path
                                d="M82 152 Q78 175 84 200"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <circle cx="84" cy="204" r="4" fill="currentColor" />
                        </g>

                        {/* kap lampu */}
                        <path
                            className="lamp-shade"
                            d="M62 38 Q100 30 138 38 L168 150 Q100 162 32 150 Z"
                        />
                        <ellipse className="lamp-rim" cx="100" cy="151" rx="67" ry="8" />

                        {/* wajah */}
                        <path
                            className="lamp-eye lamp-eye-off"
                            d="M66 96 Q74 103 82 96"
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            className="lamp-eye lamp-eye-off"
                            d="M118 96 Q126 103 134 96"
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            className="lamp-eye lamp-eye-on"
                            d="M66 98 Q74 89 82 98"
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            className="lamp-eye lamp-eye-on"
                            d="M118 98 Q126 89 134 98"
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <g className="lamp-mouth">
                            <path d="M84 108 Q100 134 116 108 Z" fill="#2b2b2b" />
                            <ellipse cx="102" cy="120" rx="8" ry="5" fill="#ef6f7e" />
                        </g>
                    </svg>
                </button>
                <p className="lamp-hint">
                    {isOn ? "Klik lagi untuk mematikan lampu" : "Klik lampu untuk menyalakan"}
                </p>
            </div>

            <div className="lamp-form">{children}</div>
        </div>
    );
};

export default LampScene;