from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine_inspection = create_engine(settings.SQLALCHEMY_DATABASE_URI_INSPECTION)
SessionLocal_inspection = sessionmaker(autocommit=False, autoflush=False, bind=engine_inspection)

engine_indicators = create_engine(settings.SQLALCHEMY_DATABASE_URI_INDICATORS)
SessionLocal_indicators = sessionmaker(autocommit=False, autoflush=False, bind=engine_indicators)

