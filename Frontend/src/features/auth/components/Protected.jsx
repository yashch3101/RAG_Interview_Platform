import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import "../auth.form.scss";

const Protected = ({children}) => {
    const { loading, user } = useAuth()


    if (loading) {
    return (
        <main className="loading-screen">

            <div className="loading-card">

                <div className="loading-logo">
                    AI Interview Coach
                </div>

                <div className="loader-ring"></div>

                <h2>Preparing Your AI Experience</h2>

                <p className="loading-message">
                    Waking up AI services and verifying your session...
                </p>

                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        </main>
    )
}

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected