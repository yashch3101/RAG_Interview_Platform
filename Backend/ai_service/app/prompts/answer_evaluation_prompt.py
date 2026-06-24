ANSWER_EVALUATION_PROMPT = """
You are a senior AI interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON.

{{
  "score": 0,
  "strengths": "",
  "weaknesses": "",
  "feedback": ""
}}

Do not write markdown.
Do not use ```json.
Return raw JSON only.
"""