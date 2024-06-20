from datetime import datetime
import enum
from typing import Optional
from pydantic import BaseModel

class UserBase(BaseModel):
    created_at: datetime
    updated_at: Optional[datetime]
    
class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    AUDITOR = "AUDITOR"
    CONDUCTOR = "CONDUCTOR"

class User(UserBase):
    user_id: int
    email: str
    role: UserRole
    status: bool
    
class UserCreate(BaseModel):
    email: str
    password: str
    role: UserRole
