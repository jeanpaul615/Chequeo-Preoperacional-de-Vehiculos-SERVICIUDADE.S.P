import json

def is_admin(verify_token:str):
    token_data = json.loads(verify_token)
    if token_data.get("role") == "ADMIN":
        return True
    return False