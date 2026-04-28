# KJ's DevOps Portfolio

> A full-stack portfolio site built to demonstrate real-world DevOps practices — infrastructure as code, containerization, serverless compute, and automated CI/CD pipelines.

🌐 **Live:** [kjdevops-portfolio.com](https://kjdevops-portfolio.com)

---

## Architecture

```
Browser
  └── Route 53 (DNS)
        └── CloudFront (CDN + HTTPS)
              ├── S3 (React/Vite static frontend)
              └── API Gateway (HTTP)
                    └── Lambda (FastAPI + Mangum + Docker)
                          └── ECR (container image registry)

GitHub Actions
  ├── frontend-deploy.yml  →  build → S3 sync → CloudFront invalidation
  └── backend-deploy.yml   →  build image → push to ECR → update Lambda
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Backend | FastAPI, Mangum, Python 3.12 |
| Containerization | Docker, AWS ECR |
| Serverless | AWS Lambda, API Gateway |
| CDN | AWS CloudFront |
| Storage | AWS S3 |
| DNS + SSL | AWS Route 53, ACM |
| IaC | Terraform |
| CI/CD | GitHub Actions |

---

## Project Structure

```
devops-portfolio/
├── frontend/               # React/Vite app
│   ├── src/
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx        # React entry point
│   └── vite.config.js
├── backend/                # FastAPI app
│   ├── main.py             # API routes + Mangum handler
│   ├── Dockerfile          # Lambda container image
│   └── requirements.txt
├── infra/                     # Terraform IaC
│   ├── backend.tf             # Remote state (S3 + DynamoDB lock)
│   ├── provider.tf            # AWS provider config
│   ├── main.tf                # Root module — calls child modules
│   ├── variables.tf           # Input variables
│   ├── outputs.tf             # Stack outputs
│   └── modules/
│       ├── storage/           # S3 bucket + OAC
│       ├── cdn/               # CloudFront + Route53
│       └── compute/           # Lambda + API Gateway + ECR + IAM
```

---

## Local Development

**Prerequisites:** Node 20+, Python 3.12, Docker, AWS CLI, Terraform

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_URL=http://localhost:8000
npm run dev                  # http://localhost:5173
```

**Backend:**
```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload    # http://localhost:8000
```

**Infrastructure (dry run):**
```bash
cd infra
terraform init
terraform plan
```

---

## CI/CD Pipelines

**Frontend pipeline** triggers on changes to `frontend/**`:
1. Checkout code onto GitHub-hosted Ubuntu runner
2. Install Node and dependencies
3. Build React app with Vite (`npm run build`)
4. Sync `dist/` to S3
5. Invalidate CloudFront cache

**Backend pipeline** triggers on changes to `backend/**`:
1. Build Docker image for `linux/amd64`
2. Authenticate to ECR
3. Push image to ECR
4. Update Lambda function to use new image

---

## Infrastructure (Terraform)

AWS resources are defined as code across three modules in `infra/modules/`:

- **storage** — S3 private bucket for frontend static files + CloudFront OAC
- **cdn** — CloudFront distribution with OAC, HTTPS enforcement, custom domain + Route 53 records
- **compute** — Lambda (FastAPI container, 256MB, 30s timeout) + API Gateway (HTTP, CORS) + ECR (vulnerability scanning) + IAM least-privilege execution role

Remote state is stored in S3 (`devops-portfolio-tfstate-kj`) with DynamoDB locking (`devops-portfolio-tflock`) to prevent concurrent apply conflicts.
---

## Challenges & Solutions

**CORS misconfiguration** — The frontend at `localhost:5173` was blocked from calling the backend at `localhost:8000`. Solved by adding `CORSMiddleware` to FastAPI with explicit `allow_origins`. Later updated for production CloudFront domain.

**Lambda + FastAPI integration** — FastAPI runs as a persistent server but Lambda expects a function handler. Used **Mangum** as an adapter to translate Lambda events into ASGI requests that FastAPI understands.

**Docker architecture mismatch** — Initial Docker image was built for ARM (Apple Silicon) but Lambda requires `linux/amd64`. Fixed by using `docker buildx build --platform linux/amd64 --provenance=false`.

**Terraform state corruption** — Accidentally committed `.terraform/` directory containing a 648MB provider binary. Removed from git history using `git filter-branch` and added proper `.gitignore`.

**Terraform module refactor + state migration** — Refactored monolithic `main.tf` into three child modules. Migrated local state to S3 backend with DynamoDB locking. Required careful `terraform state mv` and `terraform import` operations to remap existing resources to new module addresses without destroying live infrastructure.

---

## What I Learned

- Infrastructure as code with Terraform — provisioning and modifying real AWS resources through code rather than the console
- The full request lifecycle from DNS → CDN → static files and DNS → API Gateway → Lambda → FastAPI
- Docker containerization for consistent, portable deployments
- Serverless architecture tradeoffs — Lambda eliminates idle EC2 costs at the expense of cold starts
- CI/CD pipeline design — separating frontend and backend pipelines with path-based triggers
- AWS IAM least-privilege principles — every service gets only the permissions it needs
- Terraform module design — separating concerns into reusable modules with explicit input/output contracts
- Remote state management — S3 backend with DynamoDB locking for safe collaborative and pipeline-driven applies

---

## Author

**KJ** — DevOps/Cloud Engineer | AWS CCP | ITIL 4 | CompTIA A+

Currently pursuing BSIT at WGU (expected December 2026) and working as an IT Student Worker at Texas A&M University System Office.
