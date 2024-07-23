from sqlalchemy.orm import Session

from app.models.indicators.indicator import Indicator

def get_all_indicators(offset: int, limit: int, db: Session):    
    return db.query(Indicator).offset(offset).limit(limit).all()