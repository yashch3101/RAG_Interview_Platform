import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/interviewPage.scss";

import {
submitAnswer,
finishInterview
} from "../services/interview.service";

const InterviewSession = () => {

    const navigate = useNavigate();

    const [question, setQuestion] = useState(
        localStorage.getItem("question")
    );

    const [answer, setAnswer] = useState("");

    const [evaluation, setEvaluation] =
        useState(null);

    const [questionNumber,
        setQuestionNumber] =
        useState(1);

    const [canFinish,
        setCanFinish] =
        useState(false);

    const handleSubmitAnswer =
        async () => {

        if (!answer.trim()) {
            alert("Please enter an answer");
            return;
        }

        try {

            const session_id =
                localStorage.getItem(
                    "session_id"
                );

            const response =
                await submitAnswer({
                    session_id,
                    answer
                });

            if (response.can_finish) {

                setCanFinish(true);

                setEvaluation(null);

                return;
            }

            setEvaluation(
                response.evaluation
            );

            setQuestion(
                response.next_question
            );

            setQuestionNumber(
                response.question_number
            );

            setAnswer("");

        } catch (error) {

            console.error(error);

            alert(
                "Failed To Submit Answer"
            );
        }
    };

    const handleFinishInterview =
        async () => {

        try {

            const session_id =
                localStorage.getItem(
                    "session_id"
                );

            const response =
                await finishInterview({
                    session_id
                });

            localStorage.setItem(
                "report",
                JSON.stringify(
                    response.report
                )
            );

            navigate(
                "/final-report"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed To Finish Interview"
            );
        }
    };

    return (

        <div className="session-page">

            <div className="session-card">

                <h1>AI Interview Session</h1>

                <div className="progress-section">

                    <h3>
                        Question {questionNumber} / 5
                    </h3>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    `${(questionNumber / 5) * 100}%`
                            }}
                        />

                    </div>

                </div>

                <p className="session-subtitle">
                    Answer carefully and get AI-powered feedback
                </p>

                <div className="question-box">

                    {question}

                </div>

                <textarea
                    className="answer-box"
                    placeholder="Write your answer here..."
                    value={answer}
                    onChange={(e) =>
                        setAnswer(
                            e.target.value
                        )
                    }
                />

                {
                    canFinish && (

                        <div className="interview-complete">

                            🎉 Interview Completed Successfully

                            <p>
                                Click below to generate your AI report
                            </p>

                        </div>

                    )
                }

                {
                    !canFinish && (

                        <button
                            className="submit-btn"
                            onClick={
                                handleSubmitAnswer
                            }
                        >
                            Submit Answer
                        </button>

                    )
                }

                {
                    canFinish && (

                        <button
                            className="finish-btn"
                            onClick={
                                handleFinishInterview
                            }
                        >
                            Generate Final Report
                        </button>

                    )
                }

                {
                    evaluation &&
                    !canFinish && (
                        <div className="evaluation-card">

                            <h2>
                                Evaluation
                            </h2>

                            <pre>
                                {JSON.stringify(evaluation, null, 2)}
                            </pre>

                            <div className="evaluation-result">

                                <p>
                                    <strong>Score:</strong>
                                    {evaluation.score}
                                </p>

                                <p>
                                    <strong>Strengths:</strong>
                                    {evaluation.strengths}
                                </p>

                                <p>
                                    <strong>Weaknesses:</strong>
                                    {evaluation.weaknesses}
                                </p>

                                <p>
                                    <strong>Feedback:</strong>
                                    {evaluation.feedback}
                                </p>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );

};

export default InterviewSession;