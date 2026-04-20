import { useEffect, useState } from 'react'

function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(r => r.json())
      .then(setHealth)
      .catch(() => setHealth({ status: 'unreachable' }))
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
      <h1>KJ's DevOps Portfolio!</h1>
      <p>API status: <code>{health ? JSON.stringify(health) : 'loading...'}</code></p>
    </main>
  )
}

export default App
