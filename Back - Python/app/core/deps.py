from typing import Generator
from app.db.session import SessionLocal_inspection, SessionLocal_indicators

"""conexión a la base de datos de inspecciones"""
def get_db_inspection() -> Generator:
    try:
        yield SessionLocal_inspection()
    finally:
        SessionLocal_inspection().close()
        
"""conexión a la base de datos de indicadores"""
def get_db_indicators() -> Generator:
    try:
        yield SessionLocal_indicators()
    finally:
        SessionLocal_indicators().close()

        
        
