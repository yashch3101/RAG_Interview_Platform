from loader import load_documents
from chunker import chunk_documents
from embedder import get_embeddings
from vector_store import create_vector_store, save_vector_store


PDF_FOLDER = "../../../knowledge_base"
VECTOR_DB_PATH = "../../../vectorstore"


print("Loading PDFs...")
documents = load_documents(PDF_FOLDER)

print("\nChunking Documents...")
chunks = chunk_documents(documents)

print("\nGenerating Embeddings...")
embeddings = get_embeddings()

print("\nCreating FAISS Vector Store...")
vectorstore = create_vector_store(chunks, embeddings)

print("\nSaving Vector Store...")
save_vector_store(vectorstore, VECTOR_DB_PATH)

print("\nRAG Ingestion Completed Successfully!")