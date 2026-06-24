import uuid
import os

from fastapi import FastAPI, UploadFile, File, Form

from app.models.session_model import (
    create_session,
    get_session,
    update_session
)

from app.services.resume_parser import parse_resume
from app.services.skill_extractor import extract_skills
from app.services.query_builder import build_query

from app.rag.retriever import retrieve_context

from app.services.interview_manager import (
    generate_interview_question
)

from app.schemas.interview import SubmitAnswerRequest

from app.services.answer_evaluator import (
    evaluate_answer
)

from app.schemas.interview import (
    FinishInterviewRequest
)

from app.services.report_generator import (
    generate_final_report
)

app = FastAPI(
    title="InterviewIQ AI"
)


@app.get("/")
def root():
    return {
        "message": "InterviewIQ AI Running"
    }

@app.post("/start-interview")
async def start_interview(
    role: str = Form(...),
    resume: UploadFile = File(...)
):

    # Save uploaded resume

    UPLOAD_DIR = "uploads"

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        resume.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(
            await resume.read()
        )

    # Parse resume

    resume_text = parse_resume(
        file_path
    )

    skills = extract_skills(
        resume_text
    )

    query = build_query(
        role,
        skills
    )

    docs = retrieve_context(
        query
    )

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    question = generate_interview_question(
        role=role,
        skills=skills,
        context=context,
        previous_questions=[],
        previous_answers=[],
        question_number=1
    )

    session_id = str(
        uuid.uuid4()
    )

    session_data = {
        "session_id": session_id,
        "role": role,
        "skills": skills,
        "questions": [question],
        "answers": [],
        "evaluations": [],
        "context": context,
        "question_number": 1
    }

    create_session(session_data)

    return {
        "session_id": session_id,
        "question": question
    }

@app.post("/submit-answer")
def submit_answer(data: SubmitAnswerRequest):

    session = get_session(
        data.session_id
    )

    if not session:
        return {
            "error": "Invalid session id"
        }

    current_question = session["questions"][-1]

    evaluation = evaluate_answer(
        current_question,
        data.answer
    )

    session["answers"].append(
        data.answer
    )

    session["evaluations"].append(
        evaluation
    )

    MAX_QUESTIONS = 5

    session["question_number"] += 1

    update_session(
        data.session_id,
        {
            "answers": session["answers"],
            "evaluations": session["evaluations"],
            "question_number": session["question_number"]
        }
    )

    if session["question_number"] > MAX_QUESTIONS:

        update_session(
            data.session_id,
            {
                "answers": session["answers"],
                "evaluations": session["evaluations"],
                "questions": session["questions"],
                "question_number": MAX_QUESTIONS
            }
        )

        return {
            "message": "Interview Completed",
            "can_finish": True,
            "total_questions": MAX_QUESTIONS
        }

    next_question = generate_interview_question(
        role=session["role"],
        skills=session["skills"],
        context=session["context"],
        previous_questions=session["questions"],
        previous_answers=session["answers"],
        question_number=session["question_number"]
    )

    session["questions"].append(
        next_question
    )

    update_session(
        data.session_id,
        {
            "questions": session["questions"]
        }
    )

    return {
        "evaluation": evaluation,
        "next_question": next_question,
        "question_number": session["question_number"]
    }

@app.post("/finish-interview")
def finish_interview(
    data: FinishInterviewRequest
):

    session = get_session(
        data.session_id
    )

    if not session:
        return {
            "error": "Invalid session id"
        }

    report = generate_final_report(
        role=session["role"],
        questions=session["questions"],
        answers=session["answers"],
        evaluations=session["evaluations"]
    )

    update_session(
        data.session_id,
        {
            "report": report
        }
    )

    return {
        "session_id": data.session_id,
        "report": report
    }