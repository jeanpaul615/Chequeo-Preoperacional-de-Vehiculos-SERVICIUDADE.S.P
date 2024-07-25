import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.inspection import driver as crud_driver
from app.schemas.inspection.driver import Driver
from app.core.deps import get_db_inspection
from app.core.auth import verify_token, verify_admin

router = APIRouter()

@router.get("/drivers/", response_model=List[Driver])
def get_all_drivers(db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)): 
    verify_admin(token)
    drivers = crud_driver.get_all_driver(db)
    return drivers or []
