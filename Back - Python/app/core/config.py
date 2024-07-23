import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME")
    SQLALCHEMY_DATABASE_URI_INSPECTION: str = os.getenv("DATABASE_URL_INSPECTION")
    SQLALCHEMY_DATABASE_URI_INDICATORS: str = os.getenv("DATABASE_URL_INDICATORS")

settings = Settings()
