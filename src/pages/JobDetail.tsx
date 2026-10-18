import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { api } from '@/lib/api'

export default function JobDetail() {
  const { slug } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['job', slug],
    queryFn: async () => {
      const res = await api.get(`/jobs/${slug}`)
      return res.data
    },
    enabled: !!slug,
  })

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading...</div>
  if (error) return <div style={{ padding: '2rem' }}>Job not found</div>

  const job = data?.data

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>{job?.title}</h1>
      <p>{job?.description}</p>
      <h2>Requirements</h2>
      <h3>Required</h3>
      <ul>
        {job?.requirements?.required?.map((req: any, idx: number) => (
          <li key={idx}>
            <strong>{req.name}</strong>: {req.description}
          </li>
        ))}
      </ul>
      <h3>Preferred</h3>
      <ul>
        {job?.requirements?.preferred?.map((req: any, idx: number) => (
          <li key={idx}>
            <strong>{req.name}</strong>: {req.description}
          </li>
        ))}
      </ul>
      <Link to={`/jobs/${slug}/apply`}>Apply for this job</Link>
    </main>
  )
}
