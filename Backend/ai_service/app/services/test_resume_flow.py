from resume_parser import parse_resume
from skill_extractor import extract_skills
from query_builder import build_query


resume_path = "../../../sample_resume.pdf"

role = "AI Engineer"

resume_text = parse_resume(resume_path)

skills = extract_skills(resume_text)

query = build_query(role, skills)

print("\nSkills Found:\n")
print(skills)

print("\nGenerated Query:\n")
print(query)