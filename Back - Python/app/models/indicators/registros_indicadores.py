from sqlalchemy import Column, Date, Float, ForeignKey, Integer
from app.db.base import Base
from app.core.config import engine_indicators
from sqlalchemy.orm import relationship


class RegistrosIndicadores(Base):
    __tablename__ = "registrosindicadores"
    
    id_registros = Column(Integer, primary_key=True, index=True, autoincrement=True)
    indicadores_id = Column(Integer, ForeignKey("indicadores.id_indicador"))
    periodo = Column(Date)
    valor_indicador = Column(Float)
    
    """relacion con la tabla indicadores"""
    indicador = relationship("Indicadores", back_populates="registrosindicadores")
    
    
Base.metadata.create_all(bind=engine_indicators)