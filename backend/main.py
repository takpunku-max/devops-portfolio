from fastapi import FastAPI, Request # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from mangum import Mangum
from aws_lambda_powertools import Logger

logger = Logger(service="devops-portfolio")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://kjdevops-portfolio.com",
        "https://www.kjdevops-portfolio.com"
    ],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["content-type"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(
        "incoming request",
        extra={
            "path": request.url.path,
            "method": request.method,
        }
    )
    response = await call_next(request)
    logger.info(
        "request completed",
        extra={
            "path": request.url.path,
            "method": request.method,
            "status_code": response.status_code,
        }
    )
    return response


@app.get("/health")
def health():
    logger.info("health check called")
    return {"status": "0K"}


handler = Mangum(app)

