from langchain_community.vectorstores import FAISS


def create_vector_store(chunks, embeddings):

    vectorstore = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings
    )

    return vectorstore


def save_vector_store(vectorstore, path):

    vectorstore.save_local(path)

    print(f"\nVector Store Saved At: {path}")