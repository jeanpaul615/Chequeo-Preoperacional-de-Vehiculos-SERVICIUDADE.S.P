from datetime import datetime
from sqlalchemy import Column, DateTime, String, CHAR, VARCHAR, SmallInteger
from sqlalchemy.dialects.mysql import ENUM, SMALLINT
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import engine
from app.schemas.vehicle import VehicleType, AreaType

Base = declarative_base()

class Vehicle(Base):
    __tablename__ = "vehicle"
    
    vehicle_id = Column(SMALLINT(unsigned=True), primary_key=True, autoincrement=True)
    type = Column(ENUM(VehicleType), nullable=False)
    license_plate = Column(CHAR(6), nullable=False)
    brand = Column(VARCHAR(20), nullable=False)
    area = Column(ENUM(AreaType), nullable=True)
    soat_until = Column(DateTime, nullable=False)
    rtm_until = Column(DateTime, nullable=False)
    seguro_contractual_until = Column(DateTime, nullable=False)
    seguro_extracontractual_until = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=None, onupdate=datetime.now)

Base.metadata.create_all(bind=engine)
