from sqlalchemy import Column, Integer, String
from app.db.base import Base
from app.db.session import engine_indicators
from sqlalchemy.orm import relationship


class Frecuencias(Base):
    __tablename__ = "frecuencias"
    
    id_frecuencia = Column(Integer, primary_key=True, index=True, autoincrement=True)
    frecuencia = Column(String)
    
    """relacion inversa con la tabla indicadores"""
    indicadores = relationship("Indicadores", back_populates="frecuencia")
    
Base.metadata.create_all(bind=engine_indicators)
    
    
    