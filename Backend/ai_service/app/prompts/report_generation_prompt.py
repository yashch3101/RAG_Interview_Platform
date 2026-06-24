REPORT_GENERATION_PROMPT = """
You are a senior AI interviewer.

Role:
{role}

Questions:
{questions}

Answers:
{answers}

Evaluations:
{evaluations}

Generate final interview report.

Return ONLY valid JSON.

{{
  "overall_score": 0,
  "strengths": [],
  "weaknesses": [],
  "recommendation": "",
  "summary": ""
}}

Do not write markdown.
Do not use ```json.
Return raw JSON only.
"""