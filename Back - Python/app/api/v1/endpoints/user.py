from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import user as crud_user
from app.schemas.user import User, UserCreate
from app.core.deps import get_db_inspection
from app.core.auth import verify_token, verify_admin

router = APIRouter()


@router.get("/users/", response_model=List[User])
def get_all_users(db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)): 
    verify_admin(token)
    users = crud_user.get_all_users(db)
    return users or []

@router.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)):
    verify_admin(token)
    user = crud_user.get_user_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users/", response_model=User)
def create_user(user_in: UserCreate, db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)):
    verify_admin(token)
    if crud_user.get_user_by_email(db, email=user_in.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create_user(db=db, user=user_in)