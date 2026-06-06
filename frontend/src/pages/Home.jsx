import { useState, useEffect } from 'react'

function Home() {
  const [github, setGithub] = useState(null)
  const [githubError, setGithubError] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/github`)
      .then(res => res.json())
      .then(data => setGithub(data))
      .catch(() => setGithubError(true))
  }, [])

  return (
    <div className="home">

      <section className="hero">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">KJ Akpunku</h1>
        <h2 className="hero-title">DevOps & Cloud Engineer</h2>
        <p className="hero-sub">
          Building secure, automated cloud infrastructure on AWS.
          Terraform · Docker · GitHub Actions · FastAPI
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

      {!githubError && (
        <section className="github-stats">
          <h3 className="section-label">GitHub Activity</h3>
          {github ? (
            <div className="github-content">
              <div className="github-meta">
                <div className="stat">
                  <span className="stat-number">{github.public_repos}</span>
                  <span className="stat-label">Public Repos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{github.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{github.top_languages.length}</span>
                  <span className="stat-label">Languages</span>
                </div>
              </div>

              <div className="github-languages">
                <p className="github-sub">Top Languages</p>
                <div className="lang-tags">
                  {github.top_languages.map(([lang]) => (
                    <span key={lang} className="lang-tag">{lang}</span>
                  ))}
                </div>
              </div>

              <div className="github-repos">
                <p className="github-sub">Repositories</p>
                <div className="repo-list">
                  {github.top_repos.map(repo => (
                    
                     <a key={repo.name}
                      href={repo.url}
                      target="_blank"
                      className="repo-card"
                    >
                      <div className="repo-top">
                        <span className="repo-name">{repo.name}</span>
                        {repo.language && (
                          <span className="lang-tag">{repo.language}</span>
                        )}
                      </div>
                      {repo.description && (
                        <p className="repo-desc">{repo.description}</p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="github-loading">Loading GitHub stats...</p>
          )}
        </section>
      )}

    </div>
  )
}

export default Home