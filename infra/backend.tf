terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "devops-portfolio-tfstate-kj"
    key            = "devops-portfolio/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "devops-portfolio-tflock"
    encrypt        = true
  }
}