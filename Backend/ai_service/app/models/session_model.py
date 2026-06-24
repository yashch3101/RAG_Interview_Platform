from app.models.database import sessions_collection


def create_session(session_data):
    sessions_collection.insert_one(session_data)


def get_session(session_id):
    return sessions_collection.find_one(
        {"session_id": session_id},
        {"_id": 0}
    )


def update_session(session_id, updated_data):

    sessions_collection.update_one(
        {"session_id": session_id},
        {"$set": updated_data}
    )