variable "bucket_regional_domain_name" {
  description = "Regional domain name of the S3 bucket"
  type        = string
}

variable "oac_id" {
  description = "Origin access control ID"
  type        = string
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN"
  type        = string
}