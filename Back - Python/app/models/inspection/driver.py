# app/models/driver.py
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, String, SmallInteger
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.db.session import engine_inspection
from app.models.inspection.user import User

class Driver(Base):
    __tablename__ = "driver"
    
    driver_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    user_id = Column(SmallInteger, ForeignKey('user.user_id'), nullable=True)
    name = Column(String(40, collation='utf8mb4_unicode_ci'), nullable=False)
    license_until = Column(DateTime, nullable=False)
    seguridad_social_until = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.utcnow)

Base.metadata.create_all(bind=engine_inspection)
