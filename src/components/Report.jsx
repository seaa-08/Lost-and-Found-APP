import { useState } from "react";
import Button from "@mui/material/Button";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const REPORTS_STORAGE_KEY = "lost_and_found_reports";

const getPostReports = (postId) => {
    const savedReports = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY)) || [];
    return savedReports.filter((report) => String(report.postId) === String(postId));
};

const Report = ({ postId, username }) => {
    const reporter = username?.trim() || "Pengguna";
    const [postReports, setPostReports] = useState(() => getPostReports(postId));
    const hasReported = postReports.some((report) => report.reporter === reporter);

    const handleReport = () => {
        const allReports = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY)) || [];
        const alreadyReported = allReports.some(
            (report) => String(report.postId) === String(postId) && report.reporter === reporter
        );
        const updatedReports = alreadyReported
            ? allReports.filter(
                (report) => String(report.postId) !== String(postId) || report.reporter !== reporter
              )
            : [...allReports, { postId, reporter }];

        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports));
        setPostReports(updatedReports.filter((report) => String(report.postId) === String(postId)));
    };

    return (
        <Button
            type="button"
            variant="text"
            className="post-report"
            aria-pressed={hasReported}
            onClick={handleReport}
            startIcon={<FlagOutlinedIcon fontSize="small" />}
            sx={{ textTransform: "none", minWidth: 0 }}
        >
            {hasReported ? "Batal report" : "Report"}
            <span className="report-count">{postReports.length}x</span>
        </Button>
    );
};

export default Report;
