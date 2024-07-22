# app/schemas/driver.py
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Driver(BaseModel):
    driver_id: int
    user_id: Optional[int]
    name: str
    license_until: datetime
    seguridad_social_until: datetime
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
