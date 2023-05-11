import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, status, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)


# Load JSON database with UTF-8 encoding
with open("./database.json", 'r', encoding='utf-8') as f:
    db = json.load(f)


# Load JSON data from file with UTF-8 encoding
with open("./products.json", 'r', encoding='utf-8') as f:
    products = json.load(f)

# Mount "files/" directory with staticfiles
app.mount('/files/', StaticFiles(directory="files/"), name='static')

# shoose the directory for jinja2 templating
templates = Jinja2Templates(directory='templates/')


@app.get("/my_api")
async def home():
    return products


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/{url}", response_class=HTMLResponse)
async def home(request: Request, url: str):
    return templates.TemplateResponse(url, {"request": request})


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    if exc.status_code == HTTP_404_NOT_FOUND:
        return templates.TemplateResponse("404.html", {"request": request}, status_code=status.HTTP_404_NOT_FOUND)


@app.get("/product/{id}", response_class=HTMLResponse)
async def product_detail(request: Request, id: str):
    # Find the product with the given ID
    for product in products["products"]:
        if (product["id"] == str(id)) or (product["id"] == int(id)):
            return templates.TemplateResponse("product.html", {"request": request, "product": product})

    # If no product is found with the given ID, return an error message
    return templates.TemplateResponse("product_error.html", {"request": request, "id": id})


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=80, reload=True)
