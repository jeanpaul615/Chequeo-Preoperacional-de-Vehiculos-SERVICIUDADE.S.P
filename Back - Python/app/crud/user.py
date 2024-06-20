from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.password import get_password_hash

def get_all_user(db: Session):
    try:
        user_list = db.query(User).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error get all user: {str(e)}")
    return user_list

def get_user(db: Session, user_id: int):
    try:
        user = db.query(User).filter(User.user_id == user_id).first()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error crud/user/get_user(): {str(e)}")
    return user

def get_user_by_email(db: Session, email: str):
    try:
        user_by_email = db.query(User).filter(User.email == email).first()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error get user by email: {str(e)}")
    return user_by_email

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    
    db_user = User(email=user.email, hashed_password=user.password, role=user.role)
    db_user.hashed_password = hashed_password
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
