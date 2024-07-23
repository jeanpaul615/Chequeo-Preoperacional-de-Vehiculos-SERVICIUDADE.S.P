from sqlalchemy import Column, ForeignKey, Integer, String, Text
from app.db.base import Base
from sqlalchemy.orm import relationship
from app.core.config import engine_indicators


class Variable(Base):
    __tablename__ = 'variables'
    
    id_variable = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)
    codigo = Column(String(10), nullable=False)
    descripcion = Column(Text, nullable=False)
    
    valor_variables = relationship("ValorVariable", back_populates="variable")
    
Base.metadata.create_all(bind=engine_indicators)