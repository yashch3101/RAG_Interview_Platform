import re


SKILL_KEYWORDS = [
    "python",
    "java",
    "javascript",
    "typescript",
    "tensorflow",
    "pytorch",
    "keras",
    "opencv",
    "fastapi",
    "flask",
    "django",
    "mongodb",
    "mysql",
    "postgresql",
    "node.js",
    "express",
    "react",
    "next.js",
    "langchain",
    "huggingface",
    "faiss",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "cnn",
    "rnn",
    "lstm",
    "transformer",
    "yolo"
]


def extract_skills(resume_text):

    resume_text = resume_text.lower()

    found_skills = []

    for skill in SKILL_KEYWORDS:

        if re.search(rf"\b{re.escape(skill)}\b", resume_text):
            found_skills.append(skill)

    return list(set(found_skills))