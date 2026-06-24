import { useNavigate } from "react-router-dom";
import "../style/dashboard.scss";

const Dashboard = () => {

    const navigate = useNavigate();

    const totalInterviews =
        localStorage.getItem("total_interviews") || 0;

    const lastScore =
        localStorage.getItem("last_score") || 0;

    return (

        <div className="dashboard-page">

            <div className="dashboard-container">

                <h1>
                    Welcome To InterviewIQ AI
                </h1>

                <p>
                    Practice AI Interviews &
                    Improve Your Skills
                </p>

                <div className="stats-grid">

                    <div className="stat-card">
                        <h2>{totalInterviews}</h2>
                        <span>
                            Total Interviews
                        </span>
                    </div>

                    <div className="stat-card">
                        <h2>{lastScore}</h2>
                        <span>
                            Latest Score
                        </span>
                    </div>

                    <div className="stat-card">
                        <h2>AI</h2>
                        <span>RAG Powered</span>
                    </div>

                    <div className="stat-card">
                        <h2>PDF</h2>
                        <span>Report Export</span>
                    </div>

                </div>

                <button
                    onClick={() =>
                        navigate("/start-interview")
                    }
                >
                    Start New Interview
                </button>

            </div>

        </div>

    );

};

export default Dashboard;