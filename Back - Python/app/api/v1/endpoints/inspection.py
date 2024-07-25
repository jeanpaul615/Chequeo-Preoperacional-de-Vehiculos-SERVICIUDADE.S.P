import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.inspection import inspection as crud_inspection
from app.schemas.inspection.inspection import InspectionBase
from app.core.deps import get_db_inspection
from app.core.auth import verify_token, verify_admin

router = APIRouter()

@router.get("/inspection/", response_model=List[InspectionBase])
def get_all_inspection(db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)): 
    verify_admin(token)
    inspection = crud_inspection.get_all_inspection(db)
    return inspection or []