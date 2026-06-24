import "../style/finalReport.scss";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect } from "react";

const FinalReport = () => {

    const report =
        JSON.parse(
            localStorage.getItem(
                "report"
            )
        );

    useEffect(() => {

        if (!report) return;

        localStorage.setItem(
            "last_score",
            report.overall_score
        );

        const current =
            Number(
                localStorage.getItem(
                    "total_interviews"
                ) || 0
            );

        localStorage.setItem(
            "total_interviews",
            current + 1
        );

    }, [report]);

    if (!report)
        return <h1>No Report Found</h1>;

        const downloadPDF = async () => {

            const input =
                document.getElementById(
                    "report-container"
                );

            const canvas =
                await html2canvas(
                    input,
                    {
                        scale: 2
                    }
                );

            const imgData =
                canvas.toDataURL(
                    "image/png"
                );

            const pdf =
                new jsPDF(
                    "p",
                    "mm",
                    "a4"
                );

            const width =
                pdf.internal.pageSize
                .getWidth();

            const height =
                (canvas.height * width)
                / canvas.width;

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                width,
                height
            );

            pdf.save(
                "Interview_Report.pdf"
            );
        };

    return (
        <div id="report-container" className="report-page">

            <div className="report-card">

            <div className="report-header">

                <h1>🎯 Interview Report</h1>

                <div className="score-circle">
                <span>{report.overall_score}</span>
                <p>Score</p>
                </div>

            </div>

            <button
                    className="download-btn"
                    onClick={downloadPDF}
                >
                    Download PDF Report
                </button>

            <div className="report-section">

                <h2>💪 Strengths</h2>

                <ul>
                {
                    report.strengths?.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))
                }
                </ul>

            </div>

            <div className="report-section">

                <h2>⚠️ Areas To Improve</h2>

                <ul>
                {
                    report.weaknesses?.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))
                }
                </ul>

            </div>

            <div className="report-section">

                <h2>🚀 Recommendation</h2>

                <p>{report.recommendation}</p>

            </div>

            <div className="report-section">

                <h2>📋 Summary</h2>

                <p>{report.summary}</p>

            </div>

            </div>

        </div>
        );
};

export default FinalReport;