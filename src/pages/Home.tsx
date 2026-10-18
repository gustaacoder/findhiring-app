import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>FindHiring</h1>
      <p>AI-assisted technical screening platform</p>
      <Link to="/jobs">Browse job opportunities</Link>
    </main>
  )
}
