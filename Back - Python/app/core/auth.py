import os
import json
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import ExpiredSignatureError, jwt
from sqlalchemy.orm import Session
from app.core.password import verify_password
from app.crud.user import get_user_by_email
from app.schemas.inspection.user import UserAuthenticated

ALGORITHM = os.getenv("ALGORITHM")
SECRET_KEY = os.getenv("SECRET_KEY")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login/")

def authenticate_user(db: Session, user: OAuth2PasswordRequestForm) -> UserAuthenticated:
    query_db = get_user_by_email(db=db, email=user.username)
    if not query_db or not verify_password(user.password, query_db.hashed_password):
        return False
    
    return UserAuthenticated(
        user_id=query_db.user_id,
        email=query_db.email,
        role=query_db.role,
        status=query_db.status
    )

def create_access_token(data: dict) -> str:
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: Annotated[str, Depends(oauth2_scheme)]) -> UserAuthenticated:    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_data = json.loads(payload['sub'])
        return UserAuthenticated(**user_data)
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Token has expired", 
            headers={"WWW-Authenticate": "Bearer"}
        )

def verify_admin(token: UserAuthenticated):
    if token.role != "ADMIN":
        raise HTTPException(status_code=401, detail="Unauthorized user")