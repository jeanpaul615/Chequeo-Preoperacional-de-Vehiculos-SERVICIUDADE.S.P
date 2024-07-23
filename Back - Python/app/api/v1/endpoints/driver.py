import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import driver as crud_driver
from app.schemas.driver import Driver
from app.core import deps, auth
from app.core.auth import verify_token, verify_admin

router = APIRouter()

@router.get("/drivers/", response_model=List[Driver])
def get_all_drivers(db: Session = Depends(deps.get_db), token: dict = Depends(auth.verify_token)): 
    if verify_admin(token):   
        driver_list = crud_driver.get_all_driver(db)
        if not driver_list:
            raise HTTPException(status_code=400, detail="drivers not registered")
        return driver_list
    else:
        raise HTTPException(status_code=401, detail="Unauthorized driver")
