from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader


def load_documents(pdf_folder):
    documents = []

    pdf_files = Path(pdf_folder).glob("*.pdf")

    for pdf in pdf_files:
        print(f"Loading: {pdf.name}")

        loader = PyPDFLoader(str(pdf))
        docs = loader.load()

        documents.extend(docs)

    print(f"\nTotal Pages Loaded: {len(documents)}")

    return documents