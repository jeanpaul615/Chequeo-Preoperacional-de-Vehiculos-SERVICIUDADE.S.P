import enum
from pydantic import BaseModel

class IndicatorFrequency(str, enum.Enum):
    ANUAL = "anual"
    SEMESTRAL = "semestral"
    TRIMESTRAL = "trimestral"
    MENSUAL = "mensual"

class IdicatorSchema(BaseModel):
    id_indicador: int
    nombre: str
    frecuencia: IndicatorFrequency