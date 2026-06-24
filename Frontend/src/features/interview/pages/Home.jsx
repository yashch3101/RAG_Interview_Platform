import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const {
        loading,
        generatingReport,
        generateReport,
        reports
    } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (generatingReport) {
        return (
            <main className='loading-screen'>

                <div className='loading-card'>

                    <div className='spinner'></div>

                    <h1>Generating Interview Strategy</h1>

                    <p>
                        AI is analyzing your resume,
                        job description and skills...
                    </p>

                </div>

            </main>
        )
    }

    return (
    <div
        style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px"
        }}
    >
        <h1>InterviewIQ AI</h1>

        <button
            onClick={() =>
                navigate("/start-interview")
            }
        >
            Start AI Interview
        </button>
    </div>
);
}

export default Home