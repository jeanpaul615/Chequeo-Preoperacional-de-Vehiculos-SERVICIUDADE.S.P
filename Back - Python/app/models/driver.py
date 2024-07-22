# app/models/driver.py
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, String, SmallInteger
from sqlalchemy.orm import relationship
from app.db.base import Base

class Driver(Base):
    __tablename__ = "driver"
    
    driver_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    user_id = Column(SmallInteger, ForeignKey('user.user_id'), nullable=True)
    name = Column(String(40, collation='utf8mb4_unicode_ci'), nullable=False)
    license_until = Column(DateTime, nullable=False)
    seguridad_social_until = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.utcnow)
    
    # Define the relationship with User
    user = relationship("User", back_populates="drivers")
