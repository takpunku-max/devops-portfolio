function Home() {
  return (
    <div className="home">

      <section className="hero">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">KJ Akpunku</h1>
        <h2 className="hero-title">DevOps & Cloud Engineer</h2>
        <p className="hero-sub">
          Building secure, automated cloud infrastructure on AWS. 
          Terraform · Docker · GitHub Actions · FastAPI · React
        </p>
        <div className="hero-btns">
          <a href="/projects" className="btn-primary">View Projects</a>
          <a href="https://github.com/takpunku-max" target="_blank" className="btn-secondary">GitHub</a>
        </div>
      </section>
      <section className="about">
  <h3 className="section-label">About Me</h3>
  <div className="about-content">
    <div className="about-text">
      <p>
        I'm a Cloud and DevOps Engineer based in College Station, TX, 
        currently starting a Junior DevOps Engineer role at Decisive Point 
        Consulting Group. I build secure, automated infrastructure on AWS 
        using Terraform, Docker, and GitHub Actions CI/CD.
      </p>
      <p>
        I'm finishing my BSIT at Western Governors University in December 2026, 
        and hold AWS CCP, ITIL 4, CompTIA A+, and Network+ certifications, 
        with Security+ in progress.
      </p>
    </div>
    <div className="about-stats">
      <div className="stat">
        <span className="stat-number">3</span>
        <span className="stat-label">AWS Projects</span>
      </div>
      <div className="stat">
        <span className="stat-number">4</span>
        <span className="stat-label">Certifications</span>
      </div>
      <div className="stat">
        <span className="stat-number">2+</span>
        <span className="stat-label">Years Experience</span>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Home