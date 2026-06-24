import { createBrowserRouter } from "react-router";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

import StartInterview from "./features/interview/pages/StartInterview";
import InterviewSession from "./features/interview/pages/InterviewSession";
import FinalReport from "./features/interview/pages/FinalReport";
import Dashboard from "./features/interview/pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },

    {
        path: "/",
        element: (
            <Protected>
                <Dashboard />
            </Protected>
        )
    },

    {
        path: "/interview/:interviewId",
        element: (
            <Protected>
                <Interview />
            </Protected>
        )
    },

    // NEW ROUTES
    {
        path: "/start-interview",
        element: (
            <Protected>
                <StartInterview />
            </Protected>
        )
    },

    {
        path: "/interview-session",
        element: (
            <Protected>
                <InterviewSession />
            </Protected>
        )
    },

    {
        path: "/final-report",
        element: (
            <Protected>
                <FinalReport />
            </Protected>
        )
    }
]);