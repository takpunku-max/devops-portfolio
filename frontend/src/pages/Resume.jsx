function Resume() {
  return (
    <div className="page">
      <h2 className="page-title">Resume</h2>
      <p className="page-sub">Experience, education & certifications</p>

      <div className="resume-grid">

        <section className="resume-section">
          <h3 className="section-label">Experience</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-header">
                <h4>Junior DevOps Engineer</h4>
                <span className="timeline-date">May 2026 – Present</span>
              </div>
              <p className="timeline-company">Decisive Point Consulting Group</p>
              <ul className="timeline-bullets">
                <li>Starting role focused on cloud infrastructure and DevOps automation</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-header">
                <h4>IT Student Worker</h4>
                <span className="timeline-date">Aug 2024 – May 2026</span>
              </div>
              <p className="timeline-company">Texas A&M University System Office</p>
              <ul className="timeline-bullets">
                <li>Frontline IT support across Microsoft 365, networking, and endpoint systems</li>
                <li>Applied ITIL-aligned service management for incident tracking and resolution</li>
                <li>Collaborated with senior engineers on infrastructure workflows</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-label">Education</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-header">
                <h4>B.S. Information Technology</h4>
                <span className="timeline-date">Expected Dec 2026</span>
              </div>
              <p className="timeline-company">Western Governors University</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-header">
                <h4>Engineering</h4>
                <span className="timeline-date">2 years</span>
              </div>
              <p className="timeline-company">Texas A&M University</p>
              <p className="timeline-note">Transfer credits applied toward BSIT</p>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-label">Certifications</h3>
          <div className="cert-grid">
            {[
              { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", status: "Active" },
              { name: "ITIL 4 Foundation", issuer: "PeopleCert", status: "Active" },
              { name: "CompTIA A+", issuer: "CompTIA", status: "Active" },
              { name: "CompTIA Network+", issuer: "CompTIA", status: "Active" },
              { name: "CompTIA Security+", issuer: "CompTIA", status: "In Progress" },
            ].map((cert, i) => (
              <div className="cert-card" key={i}>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-issuer">{cert.issuer}</div>
                <span className={`cert-status ${cert.status === 'Active' ? 'active' : 'progress'}`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-label">Technical Skills</h3>
          <div className="skills-grid">
            {[
              { category: "Cloud & Infrastructure", skills: "AWS (Lambda, S3, CloudFront, API Gateway, ECR, Bedrock, IAM), Docker, Linux" },
              { category: "DevOps & Automation", skills: "Terraform, GitHub Actions, Git, shell scripting, serverless deployment" },
              { category: "Security & Observability", skills: "IAM least-privilege, API throttling, immutable ECR tags, CloudWatch" },
              { category: "Networking", skills: "TCP/IP, DNS, firewalls, VLANs, routing & switching" },
              { category: "Programming & APIs", skills: "Python, FastAPI, React, REST APIs, AWS Bedrock" },
            ].map((s, i) => (
              <div className="skill-item" key={i}>
                <span className="skill-category">{s.category}</span>
                <span className="skill-list">{s.skills}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Resume
