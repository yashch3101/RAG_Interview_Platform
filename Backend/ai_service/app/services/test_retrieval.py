from app.services.resume_parser import parse_resume
from app.services.skill_extractor import extract_skills
from app.services.query_builder import build_query

from app.rag.retriever import retrieve_context


resume_path = "../sample_resume.pdf"

role = "AI Engineer"

resume_text = parse_resume(resume_path)

skills = extract_skills(resume_text)

query = build_query(role, skills)

print("\nGenerated Query:")
print(query)

print("\nRetrieving Context...\n")

results = retrieve_context(query)

for i, doc in enumerate(results, start=1):

    print(f"\n===== CHUNK {i} =====\n")

    print(doc.page_content[:1000])