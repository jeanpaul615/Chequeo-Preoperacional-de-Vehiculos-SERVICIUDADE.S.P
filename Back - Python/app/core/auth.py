import os
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import ExpiredSignatureError, jwt
from sqlalchemy.orm import Session
from app.core.password import verify_password
from app.crud.user import get_user_by_email
from app.schemas.user import UserAuthenticated

ALGORITHM = os.getenv("ALGORITHM")
SECRET_KEY = os.getenv("SECRET_KEY")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login/")

def authenticate_user(db: Session, user: OAuth2PasswordRequestForm) -> UserAuthenticated:
    query_db = get_user_by_email(db=db, email=user.username)
    if not query_db or not verify_password(user.password, query_db.hashed_password):
        return False
    
    user_db = UserAuthenticated(
        user_id=query_db.user_id,
        email=query_db.email,
        role=query_db.role,
        status=query_db.status
    )
    return user_db

def create_access_token(data: dict):
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: Annotated[str, Depends(oauth2_scheme)]):    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user: UserAuthenticated = payload['sub']
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Could not validate credentials", 
                headers={"WWW-Authenticate": "Bearer"}
            )
        return user
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Token has expired", 
            headers={"WWW-Authenticate": "Bearer"}
        )