from sqlalchemy import Column, ForeignKey, Integer, String
from app.db.base import Base
from app.db.session import engine_indicators
from sqlalchemy.orm import relationship


class Indicadores(Base):
    __tablename__ = "indicadores"
    
    id_indicador = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String)
    frecuencia_id = Column(Integer, ForeignKey("frecuencias.id_frecuencia"))
    
    """relacion con la tabla frecuencias"""
    frecuencia = relationship("Frecuencias", back_populates="indicadores")
    
    """relacion inversa con la tabla registrosindicadores"""
    registrosindicadores = relationship("RegistrosIndicadores", back_populates="indicador")
    
    """relacion inversa con la tabla variables"""
    variables = relationship("Variables", back_populates="indicator")
    
Base.metadata.create_all(bind=engine_indicators)