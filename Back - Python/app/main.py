from fastapi import FastAPI
from app.api.v1.endpoints import user, login
from app.core.deps import get_db_inspection

app = FastAPI()

app.include_router(user.router, prefix="/api/v1", tags=["users"])
app.include_router(login.router, prefix="/api/v1", tags=["login"])

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI"}


