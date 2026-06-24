import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const [sessionId, setSessionId] = useState("");

    const [question, setQuestion] = useState("");

    const [questionNumber, setQuestionNumber] = useState(1);

    const [evaluation, setEvaluation] = useState(null);

    const [report, setReport] = useState(null);

    return (
        <InterviewContext.Provider
            value={{
                loading,
                setLoading,

                sessionId,
                setSessionId,

                question,
                setQuestion,

                questionNumber,
                setQuestionNumber,

                evaluation,
                setEvaluation,

                report,
                setReport
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};