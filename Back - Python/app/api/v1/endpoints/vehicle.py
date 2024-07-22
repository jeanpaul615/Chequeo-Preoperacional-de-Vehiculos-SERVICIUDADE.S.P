import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import vehicle as crud_vehicule
from app.schemas.vehicle import Vehicle
from app.core import deps, auth
from app.utils.verify_roles import is_admin

router = APIRouter()

@router.get("/vehicles/", response_model=List[Vehicle])
def get_all_vehicle(db: Session = Depends(deps.get_db), verify_token: dict = Depends(auth.verify_token)): 
    if is_admin(verify_token):   
        user_list = crud_vehicule.get_all_vehicle(db)
        if not user_list:
            raise HTTPException(status_code=400, detail="Users not registered")
        return user_list
    else:
        raise HTTPException(status_code=401, detail="Unauthorized user")
