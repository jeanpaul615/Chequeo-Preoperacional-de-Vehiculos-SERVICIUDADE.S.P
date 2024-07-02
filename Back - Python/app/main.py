import os
from fastapi import FastAPI
from app.api.v1.endpoints import user, login
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(user.router, prefix="/api/v1", tags=["users"])
app.include_router(login.router, prefix="/api/v1", tags=["login"])

PROJECT_NAME: str = os.getenv("PROJECT_NAME")
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Métodos permitidos
    allow_headers=["Authorization", "Content-Type"],  # Encabezados permitidos
)

@app.get("/")
def read_root():
    return {"message": f"Welcome to {PROJECT_NAME}" }

