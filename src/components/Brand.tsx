import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Página inicial da FindHiring">
      <span className="brand__mark" aria-hidden="true"><span /></span>
      <span>Find<span>Hiring</span></span>
    </Link>
  )
}
