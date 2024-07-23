import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import vehicle as crud_vehicule
from app.schemas.vehicle import Vehicle
from app.core.deps import get_db_inspection
from app.core.auth import verify_token, verify_admin

router = APIRouter()

@router.get("/vehicles/", response_model=List[Vehicle])
def get_all_vehicle(db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)): 
    if verify_admin(token):   
        user_list = crud_vehicule.get_all_vehicle(db)
        if not user_list:
            raise HTTPException(status_code=400, detail="Users not registered")
        return user_list
    else:
        raise HTTPException(status_code=401, detail="Unauthorized user")
