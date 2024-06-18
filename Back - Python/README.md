# inspeccion-diaria-vehiculos-serviciudad
Inspección pre operacional diaria de vehiculos - Serviciudad ESP

# Intalación del proyecto.

## Clonar repositorio:
- git clone https://github.com/kevin-mauricio/inspeccion-diaria-vehiculos-serviciudad.git

## Crear entorno conda en la direccion del repo.
- conda create --name "nombre_entorno" python

## Activar entorno conda.
- conda activate "nombre_entorno"

## Intalar requerimientos.
- pip install -r requirements.txt

## Correr el proyecto.
- uvicorn app.main:app --reload

# Descripción de Archivos y Directorios

## app/

Contiene todo el código de la aplicación.

## core/

- **config.py**: Configuraciones y variables de entorno del proyecto.

## models/

- **user.py**: Definiciones de los modelos ORM (por ejemplo, SQLAlchemy) para las tablas de la base de datos.

## schemas/

- **user.py**: Definiciones de los esquemas Pydantic para validación de datos.

## api/

- **deps.py**: Dependencias comunes que pueden ser inyectadas en los endpoints.
- **v1/**: Versión 1 de la API.
    - **endpoints/**: Contiene los archivos con los endpoints de la API, organizados por funcionalidad (ej. user.py).

## crud/

- **user.py**: Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los modelos.

## db/

- **base.py**: Configuración base para los modelos ORM.
- **session.py**: Configuración de la sesión de la base de datos.

## tests/

- **test_user.py**: Pruebas unitarias y de integración.

## .env

Variables de entorno para la configuración del proyecto.

## .gitignore

Archivos y directorios a ignorar por git.


## requirements.txt

Dependencias del proyecto.

## README.md

Descripción del proyecto.
