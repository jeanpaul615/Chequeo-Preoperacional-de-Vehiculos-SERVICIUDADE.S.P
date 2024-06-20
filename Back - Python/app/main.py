import os
from fastapi import FastAPI
from app.api.v1.endpoints import user

app = FastAPI()

app.include_router(user.router, prefix="/api/v1", tags=["users"])

PROJECT_NAME: str = os.getenv("PROJECT_NAME")

@app.get("/")
def read_root():
    return {"message": f"Welcome to {PROJECT_NAME}" }

