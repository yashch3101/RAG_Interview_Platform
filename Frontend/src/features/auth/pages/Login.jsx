import React, { useState, useEffect  } from 'react'
import { useNavigate, Link } from 'react-router'
import { Mail, Lock, Sparkles } from 'lucide-react'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loadingMessages = [
    "Connecting to AI Services...",
    "Checking Authentication...",
    "Preparing Dashboard...",
    "Loading Interview Engine..."
]

    const [messageIndex, setMessageIndex] = useState(0)

    useEffect(() => {
        if (!loading) return

        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [loading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

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
                    {loadingMessages[messageIndex]}
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

    return (
        <main className="auth-page">

            <div className="auth-left">

                <div className="brand">

                    <div className="brand-badge">
                        <Sparkles size={16} />
                        AI Powered
                    </div>

                    <h1>
                        AI Interview
                        <span className="highlight"> Coach</span>
                    </h1>

                    <p>
                        Generate ATS resumes, discover skill gaps,
                        prepare for interviews, and improve your
                        chances of getting hired.
                    </p>

                </div>

                <div className="feature-list">

                    <div className="feature-card">
                        <span>✓</span>
                        ATS Optimized Resume Builder
                    </div>

                    <div className="feature-card">
                        <span>✓</span>
                        AI Match Score Analysis
                    </div>

                    <div className="feature-card">
                        <span>✓</span>
                        Personalized Interview Questions
                    </div>

                    <div className="feature-card">
                        <span>✓</span>
                        7-Day Preparation Roadmap
                    </div>

                </div>

            </div>

            <div className="auth-right">

                <div className="form-container">

                    <div className="form-header">
                        <h2>Welcome Back 👋</h2>
                        <p>Login to continue your interview journey</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <label htmlFor="email">
                                <Mail size={16} />
                                Email
                            </label>

                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                            />

                        </div>

                        <div className="input-group">

                            <label htmlFor="password">
                                <Lock size={16} />
                                Password
                            </label>

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                            />

                        </div>

                        <button
                            className="button primary-button login-btn"
                        >
                            Login
                        </button>

                    </form>

                    <p className="auth-switch">
                        Don't have an account?
                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    )
}

export default Login