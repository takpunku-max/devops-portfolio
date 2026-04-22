# DevOps Portfolio — Future Improvements & Recommendations

## CI/CD Improvements
- Add a health check step at the end of the backend pipeline that hits `/health` to confirm deployment succeeded
- Add a rollback step that reverts to the previous version if the health check fails
- Add pytest to the backend pipeline so tests run before deploying
- Use GitHub Environments to separate dev and prod deployments

## Backend Improvements
- Add `api.kjdevops-portfolio.com` subdomain in Route 53 pointing to EC2
- Replace self-signed nginx cert with Let's Encrypt (free, trusted cert) using Certbot
- Add an Elastic IP to EC2 so the IP doesn't change on reboot
- Move the `.venv` creation into a Terraform user_data script so it runs automatically when EC2 boots
- Add a `/projects` endpoint that returns your portfolio projects as JSON
- Add a POST `/contact` endpoint for a contact form

## Infrastructure Improvements
- Store Terraform state remotely in an S3 bucket so it's shared and backed up
- Split `main.tf` into separate files: `s3.tf`, `cloudfront.tf`, `ec2.tf`, `route53.tf`
- Add Terraform variables file (`variables.tf`) instead of hardcoding values like bucket names
- Set up a dev environment that mirrors prod but costs less

## Security Improvements
- Restrict port 22 (SSH) in the security group to your home IP only instead of `0.0.0.0/0`
- Use AWS Systems Manager Session Manager instead of SSH (no open port 22 needed)
- Move FastAPI secrets to AWS Parameter Store instead of hardcoding in files
- Enable CloudFront access logging to S3

## Portfolio Site Improvements
- Build out the actual UI — project cards, skills section, contact form
- Add a `/projects` API call that populates project cards dynamically from the backend
- Add a dark/light mode toggle
- Make it mobile responsive

## Future Projects
- **Docker + Elastic Beanstalk** — containerize FastAPI with Docker, deploy via Beanstalk, add to portfolio
- **Kubernetes (EKS)** — take the Docker project further with container orchestration
- **Serverless version** — rebuild the backend using AWS Lambda + API Gateway + Mangum adapter for FastAPI, eliminates EC2 cost entirely
- **Monitoring** — add CloudWatch dashboards and alarms for EC2 CPU, memory, and request counts
- **Database** — add RDS PostgreSQL to store projects dynamically instead of hardcoding them

## Certifications to Pursue
- AWS Solutions Architect Associate (next after CCP)
- Docker Certified Associate
- Certified Kubernetes Administrator (CKA)
