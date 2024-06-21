from datetime import timedelta
import os
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.token import Token
import app.core.deps as deps
import app.core.auth as auth
from sqlalchemy.orm import Session

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

router = APIRouter()

@router.post("/login/", response_model=Token)
def loggin_access_token(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth.authenticate_user(db=db, user=form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(data={"sub": user.user_id}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}