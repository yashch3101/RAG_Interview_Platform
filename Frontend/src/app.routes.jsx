import { createBrowserRouter } from "react-router";

import Dashboard from "./features/interview/pages/Dashboard";
import Interview from "./features/interview/pages/Interview";
import StartInterview from "./features/interview/pages/StartInterview";
import InterviewSession from "./features/interview/pages/InterviewSession";
import FinalReport from "./features/interview/pages/FinalReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/interview/:interviewId",
    element: <Interview />,
  },

  {
    path: "/start-interview",
    element: <StartInterview />,
  },

  {
    path: "/interview-session",
    element: <InterviewSession />,
  },

  {
    path: "/final-report",
    element: <FinalReport />,
  },
]);