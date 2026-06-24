# InterviewIQ AI – Role-Based AI Interview Screening Platform

## Overview

InterviewIQ AI is an AI-powered candidate screening platform that simulates structured technical interviews using Retrieval-Augmented Generation (RAG).

The system dynamically generates interview questions based on:

* Candidate Resume
* Selected Job Role
* Role-Specific Knowledge Base

Unlike traditional interview systems that rely on predefined questions, InterviewIQ AI retrieves relevant concepts from curated machine learning textbooks and generates context-aware technical interview questions tailored to the candidate's background.

---

## Features

### Resume Processing

* PDF Resume Upload
* Resume Parsing
* Skill Extraction
* Technology Identification

### Retrieval-Augmented Generation (RAG)

* Knowledge Base Ingestion
* Text Chunking
* Embedding Generation
* FAISS Vector Database
* Semantic Retrieval

### Dynamic Interview Generation

* Role-Specific Questions
* Resume-Aware Questioning
* Context-Grounded Question Generation
* Multi-Step Interview Sessions

### Interview Evaluation

* AI-Based Answer Evaluation
* Strength Analysis
* Weakness Detection
* Personalized Recommendations

### Reporting

* Overall Interview Score
* Candidate Strengths
* Areas of Improvement
* Interview Summary
* PDF Report Export

### Dashboard

* Interview Statistics
* Previous Performance Tracking
* Start New Interview Workflow

---

## System Architecture

```text
Candidate
    │
    ▼
Resume Upload
    │
    ▼
Resume Parser
    │
    ▼
Skill Extraction
    │
    ▼
Query Builder
    │
    ▼
RAG Retriever
    │
    ▼
FAISS Vector Database
    │
    ▼
Relevant Context Retrieval
    │
    ▼
Question Generator
    │
    ▼
Interactive Interview
    │
    ▼
Answer Evaluation
    │
    ▼
MongoDB Storage
    │
    ▼
Final Report Generator
    │
    ▼
Dashboard + PDF Report
```

---

## Tech Stack

### Frontend

* React.js
* React Router
* SCSS
* Axios

### Backend

* FastAPI
* Python

### Database

* MongoDB Atlas

### AI / ML

* LangChain
* HuggingFace Embeddings
* Sentence Transformers
* FAISS
* Retrieval-Augmented Generation (RAG)

### PDF Processing

* PyPDF
* PDF Parsing Utilities

---

## Knowledge Base

The system uses role-specific machine learning textbooks as its primary knowledge source:

* Machine Learning – Tom Mitchell
* The Hundred-Page Machine Learning Book
* Machine Learning for Absolute Beginners
* Introduction to Machine Learning with Python
* Master Machine Learning Algorithms
* Artificial Intelligence, Machine Learning, and Deep Learning
* Bishop-Pattern-Recognition-and-Machine-Learning-2006

---

## Project Structure

Frontend

```text
Frontend/
├── src/
├── pages/
├── services/
├── context/
├── styles/
└── components/
```

Backend

```text
Backend/
├── app/
│   ├── api/
│   ├── services/
│   ├── rag/
│   ├── prompts/
│   ├── models/
│   ├── schemas/
│   └── utils/
├── vectorstore/
├── knowledge_base/
└── uploads/
```

---

## Setup Instructions

### Backend

```bash
cd Backend/ai_service

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

## Environment Variables

Backend

```env
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
```

---

## Future Enhancements

* Adaptive Follow-Up Questioning
* Voice-Based Interviews
* Emotion Analysis
* Interview History Dashboard
* Multi-Role Knowledge Bases
* Advanced Candidate Analytics

---

## Author

Yash Chaurasia

B.Tech CSE (AI & ML)

InterviewIQ AI – AI-Powered Candidate Screening Platform