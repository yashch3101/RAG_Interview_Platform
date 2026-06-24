import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="loading-screen">
            <div className="loading-card">

                <div className="ai-loader">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
                </div>

                <h2>Creating Your Account</h2>

                <p>
                Setting up your profile and preparing your AI workspace...
                </p>

                <div className="loading-progress">
                <div className="loading-progress-bar"></div>
                </div>

            </div>
            </main>
        )
        }

    return (
        <main className="auth-page">

            {/* LEFT SIDE */}

            <section className="auth-left">

                <div className="brand-badge">
                    🚀 AI Interview Platform
                </div>

                <div className="brand">
                    <h1>
                        Start Your <span className="highlight">AI Career Journey</span>
                    </h1>

                    <p>
                        Create your account and unlock personalized interview preparation,
                        ATS-friendly resume generation, AI-powered career insights,
                        and interview strategy reports tailored to your dream job.
                    </p>
                </div>

                <div className="feature-list">

                    <div className="feature-card">
                        <span>✓</span>
                        Personalized Interview Reports
                    </div>

                    <div className="feature-card">
                        <span>✓</span>
                        ATS Optimized Resume Builder
                    </div>

                    <div className="feature-card">
                        <span>✓</span>
                        Skill Gap Analysis & Roadmap
                    </div>

                </div>

            </section>

            {/* RIGHT SIDE */}

            <section className="auth-right">

                <div className="form-container">

                    <div className="form-header">
                        <h2>Create Account</h2>
                        <p>Join thousands of candidates improving their interview performance.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">
                                👤 Username
                            </label>

                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">
                                📧 Email Address
                            </label>

                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">
                                🔒 Password
                            </label>

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Create a strong password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="button primary-button login-btn"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="auth-switch">
                        Already have an account?
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>

            </section>

        </main>
    )
}

export default Register