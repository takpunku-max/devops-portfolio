# KJ's DevOps Portfolio

> A full-stack portfolio site built to demonstrate real-world DevOps practices — infrastructure as code, containerization, serverless compute, automated CI/CD pipelines, and security hardening.

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
 ├── frontend-deploy.yml → build → S3 sync → CloudFront invalidation
 ├── backend-deploy.yml  → build image → push to ECR → update Lambda → health check
 └── lint.yml            → ruff (Python) + ESLint (JS) on push and PR
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
├── frontend/                   # React/Vite app
│   ├── src/
│   │   ├── App.jsx             # Main component
│   │   └── main.jsx            # React entry point
│   └── vite.config.js
├── backend/                    # FastAPI app
│   ├── main.py                 # API routes + Mangum handler + structured logging
│   ├── Dockerfile              # Lambda container image
│   ├── .dockerignore           # Excludes venv, pycache, .env from image
│   └── requirements.txt        # Pinned dependencies including mangum
├── infra/                      # Terraform IaC
│   ├── backend.tf              # Remote state (S3 + DynamoDB lock)
│   ├── provider.tf             # AWS provider config
│   ├── main.tf                 # Root module — calls child modules
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Stack outputs
│   └── modules/
│       ├── storage/            # S3 bucket + OAC + public access block
│       ├── cdn/                # CloudFront + Route53
│       └── compute/            # Lambda + API Gateway + ECR + IAM
└── .github/
    └── workflows/
        ├── frontend-deploy.yml
        ├── backend-deploy.yml
        └── lint.yml
```

---

## Local Development

**Prerequisites:** Node 20+, Python 3.12, Docker, AWS CLI, Terraform

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local # set VITE_API_URL=http://localhost:8000
npm run dev # http://localhost:5173
```

**Backend:**
```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload # http://localhost:8000
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
3. Push image tagged with `sha-run_number` to ECR
4. Update Lambda function to use new image
5. Wait for Lambda to finish updating
6. Hit `/health` endpoint — fail the pipeline if not 200

**Lint pipeline** triggers on push to main and all pull requests:
1. Run ruff linter against backend Python
2. Run ESLint against frontend JavaScript
3. Both jobs must pass before a PR can be merged into main

---

## Infrastructure (Terraform)

AWS resources are defined as code across three modules in `infra/modules/`:

- **storage** — S3 private bucket for frontend static files + CloudFront OAC + public access block
- **cdn** — CloudFront distribution with OAC, HTTPS enforcement, custom domain + Route 53 records
- **compute** — Lambda (FastAPI container, 256MB, 30s timeout) + API Gateway (HTTP, CORS, throttling) + ECR (immutable tags, vulnerability scanning) + IAM least-privilege execution role

Remote state is stored in S3 (`devops-portfolio-tfstate-kj`) with DynamoDB locking (`devops-portfolio-tflock`) to prevent concurrent apply conflicts.

---

## Security

- **CORS** — FastAPI middleware restricts allowed origins to production domains only, methods to GET/POST/OPTIONS, and headers to content-type
- **API Gateway throttling** — default route throttling set to burst 50 / rate 100 to protect Lambda from abuse
- **S3 public access block** — all public ACLs and policies explicitly blocked at the bucket level
- **ECR immutable tags** — image tags cannot be overwritten; pipeline uses `sha-run_number` format to guarantee uniqueness across retries
- **IAM least-privilege** — Lambda execution role scoped to AWSLambdaBasicExecutionRole only
- **TLS 1.2+** — CloudFront enforces TLSv1.2_2021 minimum protocol
- **Branch protection** — main branch requires passing lint checks and a pull request before any merge; force pushes and direct deletion blocked

---

## Challenges & Solutions

**CORS misconfiguration** — The frontend at `localhost:5173` was blocked from calling the backend at `localhost:8000`. Solved by adding `CORSMiddleware` to FastAPI with explicit `allow_origins`. Later updated for production CloudFront domain.

**Lambda + FastAPI integration** — FastAPI runs as a persistent server but Lambda expects a function handler. Used **Mangum** as an adapter to translate Lambda events into ASGI requests that FastAPI understands.

**Docker architecture mismatch** — Initial Docker image was built for ARM (Apple Silicon) but Lambda requires `linux/amd64`. Fixed by using `docker buildx build --platform linux/amd64 --provenance=false`.

**Terraform state corruption** — Accidentally committed `.terraform/` directory containing a 648MB provider binary. Removed from git history using `git filter-branch` and added proper `.gitignore`.

**Terraform module refactor + state migration** — Refactored monolithic `main.tf` into three child modules. Migrated local state to S3 backend with DynamoDB locking. Required careful `terraform state mv` and `terraform import` operations to remap existing resources to new module addresses without destroying live infrastructure.

**Terraform circular dependency** — The storage module referenced the CDN module's CloudFront ARN for the bucket policy, and the CDN module referenced the storage module's S3 domain — creating a cycle Terraform couldn't resolve. Fixed by lifting the S3 bucket policy out of the storage module into the root `main.tf` where it could reference both modules freely.

**ECR immutable tags + pipeline retry failure** — Switching ECR to immutable tags broke the pipeline because retrying a failed run reused the same git SHA tag which already existed in the registry. Fixed by tagging images with `github.sha`-`github.run_number` — the run number increments on every attempt, guaranteeing a unique tag even on retries of the same commit.

---

## What I Learned

- Infrastructure as code with Terraform — provisioning and modifying real AWS resources through code rather than the console
- Terraform module design — separating concerns into reusable modules with explicit input/output contracts
- Remote state management — S3 backend with DynamoDB locking for safe collaborative and pipeline-driven applies
- The full request lifecycle from DNS → CDN → static files and DNS → API Gateway → Lambda → FastAPI
- Docker containerization for consistent, portable deployments
- Serverless architecture tradeoffs — Lambda eliminates idle EC2 costs at the expense of cold starts
- CI/CD pipeline design — separating frontend and backend pipelines with path-based triggers
- AWS IAM least-privilege principles — every service gets only the permissions it needs
- Security hardening at every layer — tightening CORS, throttling API endpoints, blocking public S3 access, and enforcing immutable container image tags
- Branch protection with required status checks — enforcing lint gates and PR workflows to mirror professional engineering team practices

---

## Author

**KJ** — DevOps/Cloud Engineer | AWS CCP | ITIL 4 | CompTIA A+

Currently pursuing BSIT at WGU (expected December 2026) and working as an IT Student Worker at Texas A&M University System Office.