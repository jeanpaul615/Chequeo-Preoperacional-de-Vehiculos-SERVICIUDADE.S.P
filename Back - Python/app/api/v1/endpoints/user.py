import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import user as crud_user
from app.schemas.user import User, UserCreate
from app.core import deps, auth
from app.utils.verify_roles import is_admin

router = APIRouter()

@router.get("/users/", response_model=List[User])
def get_all_user(db: Session = Depends(deps.get_db), verify_token: dict = Depends(auth.verify_token)): 
    if is_admin(verify_token):   
        user_list = crud_user.get_all_user(db)
        if not user_list:
            raise HTTPException(status_code=400, detail="Users not registered")
        return user_list
    else:
        raise HTTPException(status_code=401, detail="Unauthorized user")

@router.post("/users/", response_model=User)
def create_user(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    user = crud_user.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud_user.create_user(db=db, user=user_in)

@router.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(deps.get_db)):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
