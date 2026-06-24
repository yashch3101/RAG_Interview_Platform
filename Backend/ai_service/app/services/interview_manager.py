from app.prompts.interview_question_prompt import (
    INTERVIEW_QUESTION_PROMPT
)

from app.services.question_generator import (
    generate_questions
)


def generate_interview_question(
    role,
    skills,
    context,
    previous_questions,
    previous_answers,
    question_number
):

    prompt = INTERVIEW_QUESTION_PROMPT.format(
        role=role,
        skills=", ".join(skills),
        previous_questions="\n".join(previous_questions),
        previous_answers="\n".join(previous_answers),
        context=context,
        question_number=question_number
    )

    question = generate_questions(prompt)

    return question