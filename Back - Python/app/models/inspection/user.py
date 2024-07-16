from datetime import datetime
import enum
from sqlalchemy import Boolean, Column, DateTime, Enum, SmallInteger, String
from app.db.base import Base
from app.db.session import engine_inspection
from app.schemas.user import UserRole

class User(Base):
    __tablename__ = "user"
    
    user_id = Column(SmallInteger, primary_key=True, index=True, autoincrement=True)
    email = Column(String(60), unique=True, nullable=False)
    hashed_password = Column(String(120), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.now())
    
Base.metadata.create_all(bind=engine_inspection)
