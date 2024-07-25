from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InspectionBase(BaseModel):
    inspection_id: int
    driver_id: int
    vehicle_id: Optional[int]
    mileage: int
    comment: Optional[str]
    checked_by: Optional[str]
    audited_by: Optional[str]
    is_checked: bool
    created_at: datetime
    updated_at: Optional[datetime]

class Config:
    from_attributes = True