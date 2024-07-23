from sqlalchemy import DECIMAL, Column, ForeignKey, Integer
from app.db.base import Base
from sqlalchemy.orm import relationship
from app.core.config import engine_indicators


class ValorVariable(Base):
    __tablename__ = 'valor_variables'
    
    id_valor = Column(Integer, primary_key=True, autoincrement=True)
    indicador_id = Column(Integer, ForeignKey('indicadores.id_indicador'), nullable=False)
    variable_id = Column(Integer, ForeignKey('variables.id_variable'), nullable=False)
    valor = Column(DECIMAL(10, 2), nullable=False)
    
    indicador = relationship("Indicador", back_populates="valor_variables")
    variable = relationship("Variable", back_populates="valor_variables")
    
Base.metadata.create_all(bind=engine_indicators)
