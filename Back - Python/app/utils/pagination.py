from sqlalchemy.orm import Session
from sqlalchemy import func

def paginate(page: int, model: object, db: Session, items_per_page: int = 10):
    """
    Paginación de resultados de una consulta SQLAlchemy.

    :param page: Página actual.
    :param model: El modelo SQLAlchemy a consultar.
    :param db: Instancia de sesión de SQLAlchemy.
    :param items_per_page: Cantidad de elementos por página.
    :return: Diccionario con la información de la paginación y los resultados de la página actual.
    """
    # Calcula el offset y total de ítems
    offset = (page - 1) * items_per_page
    total_items = db.query(func.count('*')).select_from(model).scalar()
    total_pages = (total_items // items_per_page) + (1 if total_items % items_per_page > 0 else 0)

    # Realiza la consulta con paginación
    items = db.query(model).offset(offset).limit(items_per_page).all()

    return {
        "items_per_page": items_per_page,
        "total_items": total_items,
        "total_pages": total_pages,
        "current_page": page,
        "items": items
    }
