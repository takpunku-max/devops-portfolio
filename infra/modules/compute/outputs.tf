output "api_gateway_endpoint" {
  value = aws_apigatewayv2_stage.backend.invoke_url
}

output "ecr_repository_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "lambda_function_name" {
  value = aws_lambda_function.backend.function_name
}

