from typing import Generator
from app.db.session import SessionLocal_inspection, SessionLocal_indicators

def get_db_inspection() -> Generator:
    try:
        yield SessionLocal_inspection()
    finally:
        SessionLocal_inspection().close()
        
def get_db_indicators() -> Generator:
    try:
        yield SessionLocal_indicators()
    finally:
        SessionLocal_indicators().close()

        
        
