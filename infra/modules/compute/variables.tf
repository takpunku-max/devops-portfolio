variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "lambda_image_uri" {
  description = "ECR image URI for the Lambda function"
  type        = string
}

variable "cors_allow_origins" {
  description = "Allowed origins for API Gateway CORS"
  type        = list(string)
}