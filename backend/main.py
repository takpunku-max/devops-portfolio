from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from aws_lambda_powertools import Logger
from pydantic import BaseModel
import boto3
import httpx
import os

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

GITHUB_USERNAME = "takpunku-max"
GITHUB_TOKEN = os.environ.get("GIT_TOKEN","")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "kj.akpunku@decisivepoint.net")

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

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

@app.get("/github")
async def github_stats():
    headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

    async with httpx.AsyncClient() as client:
        try:
            profile_res = await client.get(
                f"https://api.github.com/users/{GITHUB_USERNAME}",
                headers=headers
            )
            profile = profile_res.json()

            repos_res = await client.get(
                f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100&sort=updated",
                headers=headers
            )
            repos = repos_res.json()

            languages = {}
            for repo in repos:
                if repo.get("language"):
                    lang = repo["language"]
                    languages[lang] = languages.get(lang, 0) + 1

            top_repos = sorted(
                [r for r in repos if not r.get("fork")],
                key=lambda x: x.get("stargazers_count", 0),
                reverse=True
            )[:4]

            return {
                "public_repos": profile.get("public_repos", 0),
                "followers": profile.get("followers", 0),
                "top_languages": sorted(languages.items(), key=lambda x: x[1], reverse=True)[:5],
                "top_repos": [
                    {
                        "name": r["name"],
                        "description": r.get("description", ""),
                        "stars": r.get("stargazers_count", 0),
                        "url": r.get("html_url", ""),
                        "language": r.get("language", "")
                    }
                    for r in top_repos
                ]
            }
        except Exception as e:
            logger.error(f"GitHub API error: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch GitHub stats")

@app.post("/contact")
async def contact(request: ContactRequest):
    if not request.name or not request.email or not request.message:
        raise HTTPException(status_code=400, detail="All fields are required")
    
    if len(request.message) > 5000:
        raise HTTPException(status_code=400, detail="Message too long")
    
    ses = boto3.client("ses", region_name="us-east-1")

    try:
        ses.send_email(
            Source=CONTACT_EMAIL,
            Destination={"ToAddresses": [CONTACT_EMAIL]},
            Message={
                "Subject": {
                    "Data": f"Portfolio Contact: {request.name}"
                },
                "Body": {
                    "Text": {
                        "Data": f"Name: {request.name}\nEmail: {request.email}\n\nMessage:\n{request.message}"
                    }
                }
            }
        )
        logger.info(f"Contact form submitted by {request.email}")
        return {"status": "sent"}
    except Exception as e:
        logger.error(f"SES error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message")


handler = Mangum(app)

