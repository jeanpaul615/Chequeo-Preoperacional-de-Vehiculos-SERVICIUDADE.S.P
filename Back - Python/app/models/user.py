# app/models/user.py
from datetime import datetime
import enum
from sqlalchemy.orm import relationship
from sqlalchemy import Boolean, Column, DateTime, Enum, SmallInteger, String
from app.db.base import Base
from app.schemas.user import UserRole

class User(Base):
    __tablename__ = "user"
    
    user_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    email = Column(String(60), unique=True, nullable=False)
    hashed_password = Column(String(120), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.utcnow)

    # Define the relationship with Driver
    drivers = relationship("Driver", back_populates="user")
