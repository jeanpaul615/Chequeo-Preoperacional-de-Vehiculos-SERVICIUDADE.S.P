from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.driver import Driver

def get_all_driver(db: Session):
    try:
        driver_list = db.query(Driver).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error get all drivers: {str(e)}")
    return driver_list


