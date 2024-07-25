# app/models/inspection.py
from datetime import datetime
from sqlalchemy import Column, DateTime, String, Text, ForeignKey
from sqlalchemy.dialects.mysql import ENUM, INTEGER, SMALLINT, TINYINT
from sqlalchemy.orm import relationship
from app.db.base import Base  # Use Base from app.db.base
from app.db.session import engine_inspection
from app.models.inspection.vehicle import Vehicle
from app.models.inspection.driver import Driver


class Inspection(Base):
    __tablename__ = 'inspection'
    
    inspection_id = Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    driver_id = Column(SMALLINT(unsigned=True), ForeignKey('driver.driver_id'), nullable=False)
    vehicle_id = Column(SMALLINT(unsigned=True), ForeignKey('vehicle.vehicle_id'), nullable=True)
    mileage = Column(INTEGER(unsigned=True), nullable=False)
    comment = Column(Text, nullable=True)
    checked_by = Column(String(40), nullable=True)
    audited_by = Column(String(40), nullable=True)
    is_checked = Column(TINYINT(1), default=0, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.now)
    
Base.metadata.create_all(bind=engine_inspection)
