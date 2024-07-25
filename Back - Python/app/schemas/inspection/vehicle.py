from datetime import datetime
import enum
from typing import Optional
from pydantic import BaseModel

class VehicleType(enum.Enum):
    RECOLECTOR = 'RECOLECTOR'
    VOLQUETA = 'VOLQUETA'
    LIVIANO = 'LIVIANO'
    OTRO = 'OTRO'

class AreaType(enum.Enum):
    ASEO = 'ASEO'
    ACUEDUCTO = 'ACUEDUCTO'
    ALCANTARILLADO = 'ALCANTARILLADO'
    OTRO = 'OTRO'

class Vehicle(BaseModel):
    vehicle_id: int
    type: VehicleType
    license_plate: str
    brand: str
    area: Optional[AreaType]
    soat_until: datetime
    rtm_until: datetime
    seguro_contractual_until: datetime
    seguro_extracontractual_until: datetime
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True  # Updated for Pydantic V2
