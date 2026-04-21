terraform{
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}


resource "aws_s3_bucket" "frontend" {
    bucket = "devops-portfolio-frontend-takpunku"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
    bucket = aws_s3_bucket.frontend.id

    index_document {
        suffix = "index.html"
    }

    error_document {
        key = "index.html"
    }
}


resource "aws_cloudfront_distribution" "frontend" {
    enabled = true
    default_root_object = "index.html"

    origin {
        domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
        origin_id                = "s3-frontend"
        origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
}

    default_cache_behavior {
        target_origin_id = "s3-frontend"
        viewer_protocol_policy = "redirect-to-https"
        allowed_methods = ["GET", "HEAD"]
        cached_methods = ["GET", "HEAD"]

        forwarded_values {
            query_string = false
            cookies {
                forward = "none"
            }
        }
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    viewer_certificate{
        cloudfront_default_certificate = true
    }
}


resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "devops-portfolio-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_instance" "backend" {
    ami = "ami-0453ec754f44f9a4a"
    instance_type = "t3.micro"
    key_name = "devops-portfolio"
    vpc_security_group_ids = [aws_security_group.backend.id]

    tags = {
        Name = "devops-portfolio-backend"
    }
}

resource "aws_security_group" "backend" {
    name = "devops-portfolio-backend-sg"

    ingress{
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 8000
        to_port = 8000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
}

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_s3_bucket_policy" "frontend" {
    bucket = aws_s3_bucket.frontend.id
    
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Sid = "AllowCloudFrontAccess"
                Effect = "Allow"
                Principal = {
                    Service = "cloudfront.amazonaws.com"
                }
                Action = "s3:GetObject"
                Resource = "${aws_s3_bucket.frontend.arn}/*"
                Condition = {
                    StringEquals = {
                        "AWS:SourceArn" = aws_cloudfront_distribution.frontend.arn
                    }
                }
            }
        ]
    })
}
