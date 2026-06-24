from app.models.database import db

print(db.list_collection_names())
print("Mongo Connected Successfully")