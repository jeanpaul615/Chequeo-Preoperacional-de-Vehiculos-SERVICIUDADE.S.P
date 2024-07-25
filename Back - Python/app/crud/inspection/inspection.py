from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.inspection.inspection import Inspection

def get_all_inspection(db: Session):
    try:
        inspection_list = db.query(Inspection).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error get all vehicule: {str(e)}")
    return inspection_list


