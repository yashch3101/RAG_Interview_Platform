from app.services.resume_parser import parse_resume
from app.services.skill_extractor import extract_skills
from app.services.query_builder import build_query
from app.services.question_generator import generate_questions

from app.rag.retriever import retrieve_context

from app.prompts.question_generation_prompt import (
    QUESTION_GENERATION_PROMPT
)

resume_path = "../sample_resume.pdf"

role = "AI Engineer"

# Step 1: Parse Resume
resume_text = parse_resume(resume_path)

# Step 2: Extract Skills
skills = extract_skills(resume_text)

# Step 3: Build Query
query = build_query(role, skills)

# Step 4: Retrieve Context
results = retrieve_context(query)

# Step 5: Combine Retrieved Chunks
context = "\n\n".join(
    [doc.page_content for doc in results]
)

# Step 6: Create Prompt
prompt = QUESTION_GENERATION_PROMPT.format(
    role=role,
    skills=", ".join(skills),
    context=context
)

# Step 7: Generate Questions
questions = generate_questions(prompt)

print("\nGenerated Questions:\n")
print(questions)