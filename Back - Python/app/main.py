from fastapi import FastAPI
from app.api.v1.endpoints import user, login, vehicle, driver
from fastapi.middleware.cors import CORSMiddleware
from app.core.deps import get_db_inspection

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permitir solicitudes desde localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

app.include_router(user.router, prefix="/api/v1", tags=["users"])
app.include_router(vehicle.router, prefix="/api/v1", tags=["vehicle"])
app.include_router(driver.router, prefix="/api/v1", tags=["driver"])
app.include_router(login.router, prefix="/api/v1", tags=["login"])



@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI"}
