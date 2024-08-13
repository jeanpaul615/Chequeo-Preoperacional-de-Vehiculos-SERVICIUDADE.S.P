from typing import Generator
from app.db.session import SessionLocal_inspection, SessionLocal_indicators

"""Conexión a la base de datos de inspecciones"""
def get_db_inspection() -> Generator:
    db = SessionLocal_inspection()  # Crear una instancia de sesión
    try:
        yield db  # Pasar la sesión al consumidor
    finally:
        db.close()  # Cerrar la misma instancia de sesión

"""Conexión a la base de datos de indicadores"""
def get_db_indicators() -> Generator:
    db = SessionLocal_indicators()  # Crear una instancia de sesión
    try:
        yield db  # Pasar la sesión al consumidor
    finally:
        db.close()  # Cerrar la misma instancia de sesión
