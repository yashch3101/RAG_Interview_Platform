def build_query(role, skills):

    query_parts = []

    query_parts.append(role)

    query_parts.extend(skills)

    query = " ".join(query_parts)

    return query