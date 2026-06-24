import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)

VECTOR_DB_PATH = os.path.join(BASE_DIR, "vectorstore")

def retrieve_context(query, k=5):

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    print("VECTOR PATH:", VECTOR_DB_PATH)

    vectorstore = FAISS.load_local(
        VECTOR_DB_PATH,
        embeddings,
        allow_dangerous_deserialization=True
    )

    docs = vectorstore.max_marginal_relevance_search(
        query=query,
        k=k,
        fetch_k=20
    )

    return docs