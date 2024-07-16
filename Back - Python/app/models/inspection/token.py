from datetime import datetime
from sqlalchemy import Column, ForeignKey, DateTime, SmallInteger, String
from app.db.base import Base
from app.db.session import engine


class Token(Base):
    __tablename__ = "token"
    
    user_id = Column(SmallInteger, ForeignKey('user.user_id'), primary_key=True)
    token = Column(String(255), primary_key=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.now())
    
Base.metadata.create_all(bind=engine)
    
    