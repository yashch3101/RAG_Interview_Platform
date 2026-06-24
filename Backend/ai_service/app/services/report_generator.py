import json
import re

from app.prompts.report_generation_prompt import (
    REPORT_GENERATION_PROMPT
)

from app.services.question_generator import (
    generate_questions
)


def generate_final_report(
    role,
    questions,
    answers,
    evaluations
):

    prompt = REPORT_GENERATION_PROMPT.format(
        role=role,
        questions="\n".join(questions),
        answers="\n".join(answers),
        evaluations="\n".join(
            [str(e) for e in evaluations]
        )
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
            "overall_score": 0,
            "strengths": [],
            "weaknesses": [],
            "recommendation": "Parsing Failed",
            "summary": response
        }