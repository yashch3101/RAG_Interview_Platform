import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/startInterview.scss";

import { startInterview } from "../services/interview.service";

const StartInterview = () => {

    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleStartInterview = async () => {

        if (!role || !resume) {
            alert("Role and Resume Required");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("role", role);
            formData.append("resume", resume);

            const response =
                await startInterview(formData);

            localStorage.setItem(
                "session_id",
                response.session_id
            );

            localStorage.setItem(
                "question",
                response.question
            );

            navigate("/interview-session");

        }
        catch (error) {

            console.error("FULL ERROR => ", error);

            console.log("RESPONSE => ", error?.response);

            console.log("DATA => ", error?.response?.data);

            alert("Failed To Start Interview");
        }
        finally {
            setLoading(false);
        }
    };

    return (
    <div className="start-interview">
        <div className="interview-card">

        <h1>InterviewIQ AI</h1>

        <p>
            Upload your resume and start
            an AI-powered interview
        </p>

        <div className="form-group">
            <label>Role</label>

            <input
            type="text"
            placeholder="Machine Learning Engineer"
            value={role}
            onChange={(e) =>
                setRole(e.target.value)
            }
            />
        </div>

        <div className="upload-box">

            <label>
            Upload Resume (PDF)
            </label>

            <br />

            <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
                setResume(e.target.files[0])
            }
            />

        </div>

        <button
            onClick={handleStartInterview}
            disabled={loading}
        >
            {
            loading
                ? "Starting..."
                : "Start Interview"
            }
        </button>

        </div>
    </div>
    );
};

export default StartInterview;