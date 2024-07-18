from sqlalchemy import DECIMAL, Column, Date, Float, ForeignKey, Integer
from app.db.base import Base
from app.core.config import engine_indicators
from sqlalchemy.orm import relationship


class RegistroIndicador(Base):
    __tablename__ = 'registro_indicadores'
    
    id_registro = Column(Integer, primary_key=True, autoincrement=True)
    indicador_id = Column(Integer, ForeignKey('indicadores.id_indicador'), nullable=False)
    valor = Column(DECIMAL(10, 2), nullable=False)
    periodo_inicio = Column(Date, nullable=False)
    periodo_fin = Column(Date, nullable=False)
    
    indicador = relationship("Indicador", back_populates="registro_indicadores")
    
    
Base.metadata.create_all(bind=engine_indicators)