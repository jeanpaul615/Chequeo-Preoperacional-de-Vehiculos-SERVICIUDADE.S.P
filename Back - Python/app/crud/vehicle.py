from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.vehicle import Vehicle

def get_all_vehicle(db: Session):
    try:
        vehicle_list = db.query(Vehicle).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error get all vehicule: {str(e)}")
    return vehicle_list


