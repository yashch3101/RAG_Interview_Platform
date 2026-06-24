import json
import re

from app.prompts.answer_evaluation_prompt import (
    ANSWER_EVALUATION_PROMPT
)

from app.services.question_generator import (
    generate_questions
)


def evaluate_answer(question, answer):

    prompt = ANSWER_EVALUATION_PROMPT.format(
        question=question,
        answer=answer
    )

    response = generate_questions(prompt)

    try:

        cleaned = re.sub(
            r"```json|```",
            "",
            response
        ).strip()

        return json.loads(cleaned)

    except Exception:

        return {
            "score": 0,
            "strengths": "Parsing Failed",
            "weaknesses": "Invalid JSON",
            "feedback": response
        }