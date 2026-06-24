from pydantic import BaseModel


class StartInterviewRequest(BaseModel):
    role: str
    resume_path: str


class SubmitAnswerRequest(BaseModel):
    session_id: str
    answer: str


class FinishInterviewRequest(BaseModel):
    session_id: str