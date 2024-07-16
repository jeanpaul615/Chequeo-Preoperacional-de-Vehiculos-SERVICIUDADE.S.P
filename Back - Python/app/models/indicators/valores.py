from sqlalchemy import Column, Date, Float, ForeignKey, Integer
from app.db.base import Base
from app.core.config import engine_indicators
from sqlalchemy.orm import relationship


class Valores(Base):
    __tablename__ = "valores"
    
    id_valor = Column(Integer, primary_key=True, index=True, autoincrement=True)
    variable_id = Column(Integer, ForeignKey("variables.id_variable"))
    valor = Column(Float)
    periodo = Column(Date)
    
    """relacion con la tabla variables"""
    variable = relationship("Variables", back_pupulates="valores")
    
Base.metadata.create_all(bind=engine_indicators)
