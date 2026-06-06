const projects = [
  {
    title: "AI Terraform Security & Cost Analyzer",
    tags: ["AWS Bedrock", "Terraform", "Docker", "GitHub Actions", "FastAPI"],
    description: "Production-grade AI web app that analyzes Terraform code for security misconfigurations and cost optimization using AWS Bedrock (Claude Haiku 4.5). Features modular Terraform architecture, remote state with DynamoDB locking, and full DevSecOps practices.",
    live: "https://analyzer.kjdevops-portfolio.com",
    github: "https://github.com/takpunku-max/terraform-analyzer"
  },
  {
    title: "DevOps Portfolio Site",
    tags: ["FastAPI", "Terraform", "Docker", "GitHub Actions"],
    description: "Full-stack serverless portfolio with React/Vite frontend on S3 + CloudFront and FastAPI backend on Lambda via API Gateway. Three Terraform modules with remote state, immutable ECR tags, and security hardening at every layer.",
    live: "https://kjdevops-portfolio.com",
    github: "https://github.com/takpunku-max/devops-portfolio"
  },
  {
    title: "Cloud Infrastructure & AI Health Platform",
    tags: ["AWS EC2", "Docker", "GitHub Actions", "FastAPI", "OpenAI"],
    description: "Containerized FastAPI app behind Nginx with TLS on EC2. Automated EC2 lifecycle scheduling via EventBridge and Lambda. Integrates OpenAI API for human-readable system health summaries.",
    live: null,
    github: null
  }
]

function Projects() {
  return (
    <div className="page">
      <h2 className="page-title">Projects</h2>
      <p className="page-sub">Things I've built on AWS</p>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div className="project-card" key={i}>
            <div className="card-top">
              <h3>{p.title}</h3>
              <div className="tags">
                {p.tags.map((tag, j) => (
                  <span className="tag-warm" key={j}>{tag}</span>
                ))}
              </div>
            </div>
            <p className="card-desc">{p.description}</p>
            <div className="card-links">
              {p.live && <a href={p.live} target="_blank" className="btn-primary">Live Site</a>}
              {p.github && <a href={p.github} target="_blank" className="btn-secondary">GitHub</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects