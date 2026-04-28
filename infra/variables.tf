variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "devops-portfolio"
}

variable "bucket_name" {
  description = "S3 frontend bucket name"
  type        = string
  default     = "devops-portfolio-frontend-takpunku"
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
  default     = "kjdevops-portfolio.com"
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for CloudFront"
  type        = string
  default     = "arn:aws:acm:us-east-1:895112955219:certificate/d177e328-f32d-401e-ab9a-5b29793f862c"
}

variable "lambda_image_uri" {
  description = "ECR image URI for Lambda"
  type        = string
  default     = "895112955219.dkr.ecr.us-east-1.amazonaws.com/devops-portfolio-backend:latest"
}