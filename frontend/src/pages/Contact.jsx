import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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

        <div className="contact-form">
          <h3 className="section-label">Send a Message</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p className="form-success">Message sent — I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-error">Something went wrong. Try emailing directly.</p>
            )}
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact