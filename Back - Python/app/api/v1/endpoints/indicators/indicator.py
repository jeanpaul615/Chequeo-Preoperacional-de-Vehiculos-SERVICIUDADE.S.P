from fastapi import APIRouter, Depends

from app.core.deps import get_db_indicators
from app.models.indicators.indicator import Indicator
from sqlalchemy.orm import Session
from app.crud.indicators import indicator as crud_indicator
from app.utils.pagination import pagination


router = APIRouter()

@router.get("/indicators/{page}")
def get_all_indicators(page: int,db: Session = Depends(get_db_indicators)):  
    pagination_values = pagination(page, Indicator, db)
    indicators = crud_indicator.get_all_indicators(offset=pagination_values["offset"], limit=pagination_values["items_per_page"], db=db)
    return {"indicators": indicators, "total_pages": pagination_values["total_pages"]} or []

