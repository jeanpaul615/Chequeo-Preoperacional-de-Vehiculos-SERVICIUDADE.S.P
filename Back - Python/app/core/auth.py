from datetime import datetime, timedelta
import os
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
import jwt
from sqlalchemy.orm import Session
from app.core.password import verify_password
from app.crud.user import get_user_by_email
from app.schemas.user import UserAuth
from app.core import deps

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def authenticate_user(db: Session = Depends(deps.get_db), user = Depends(deps.get_oath2_scheme)):
    try:
        user_db = get_user_by_email(db=db, email=user.username)
        if not user_db:
            return False
        if not verify_password(plain_password=user.password, hashed_password=user_db.hashed_password):
            return False
        return user_db
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error authenticate user: {str(e)}")

def get_current_user(token: str = Depends(deps.get_oath2_scheme), db: Session = Depends(deps.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = verify_token(token)
        useremail: str = payload.get("sub")
        if useremail is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=useremail)
    if user is None:
        raise credentials_exception
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str = Depends(deps.get_oath2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    