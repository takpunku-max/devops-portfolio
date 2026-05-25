function Contact() {
  return (
    <div className="page">
      <h2 className="page-title">Contact</h2>
      <p className="page-sub">Let's connect</p>

      <div className="contact-grid">

        <div className="contact-links">
          <h3 className="section-label">Find Me Online</h3>
          <div className="contact-items">
            <a href="mailto:takpun1@wgu.edu" className="contact-item">
              <span className="contact-icon">✉</span>
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">takpun1@wgu.edu</span>
              </div>
            </a>
            <a href="https://github.com/takpunku-max" target="_blank" className="contact-item">
              <span className="contact-icon">⌥</span>
              <div>
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/takpunku-max</span>
              </div>
            </a>
            <a href="https://linkedin.com/in/kj-akpunku-113968255" target="_blank" className="contact-item">
              <span className="contact-icon">in</span>
              <div>
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">kj-akpunku-113968255</span>
              </div>
            </a>
          </div>
        </div>

        <div className="contact-availability">
          <h3 className="section-label">Availability</h3>
          <div className="availability-card">
            <div className="status-dot"></div>
            <div>
              <p className="status-title">Currently employed</p>
              <p className="status-sub">Junior DevOps Engineer @ Decisive Point Consulting Group</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact

