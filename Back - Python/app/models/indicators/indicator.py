from sqlalchemy import Column, Enum, ForeignKey, Integer, String
from app.db.base import Base
from app.db.session import engine_indicators
from sqlalchemy.orm import relationship


class Indicator(Base):
    __tablename__ = 'indicadores'
    
    id_indicador = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    frecuencia = Column(Enum('anual', 'semestral', 'trimestral', 'mensual'), nullable=False)
    
"""     valor_variables = relationship("ValorVariable", back_populates="indicador")
    registro_indicadores = relationship("RegistroIndicador", back_populates="indicador") """
    
Base.metadata.create_all(bind=engine_indicators)