from sqlalchemy import Column, ForeignKey, Integer, String
from app.db.base import Base
from sqlalchemy.orm import relationship
from app.core.config import engine_indicators


class Variables(Base):
    __tablename__ = "variables"
    
    id_variable = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre_variable = Column(String)
    indicator_id = Column(Integer, ForeignKey("indicators.id_indicator"))
    
    """relacion inversa con la tabla valores"""
    valores = relationship("Valores", back_populates="variable")
    
    """relacion con la tabla indicadores"""
    indicator = relationship("Indicators", back_populates="variables")
    
Base.metadata.create_all(bind=engine_indicators)