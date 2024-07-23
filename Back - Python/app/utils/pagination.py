from sqlalchemy.orm import Session

def pagination(page: int, model: object, db: Session):
    items_per_page = 10
    total_items = db.query(model).count()
    offset = (page - 1) * items_per_page
    total_pages = (total_items // items_per_page) + (1 if total_items % items_per_page > 0 else 0)

    return {
        "items_per_page": items_per_page,
        "total_items": total_items,
        "offset": offset,
        "total_pages": total_pages,
    }