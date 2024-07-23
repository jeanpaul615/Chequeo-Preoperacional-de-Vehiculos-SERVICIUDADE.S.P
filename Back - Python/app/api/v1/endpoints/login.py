from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.inspection.token import Token
from app.core.deps import get_db_inspection
import app.core.auth as auth
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/login/", response_model=Token)
def loggin_access_token(db: Session = Depends(get_db_inspection), form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth.authenticate_user(db=db, user=form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token = auth.create_access_token(data={"sub": user.model_dump_json()})
    return {"access_token": access_token, "token_type": "bearer"}