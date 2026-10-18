import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'

type Job = {
  id: number
  title: string
  slug: string
  description_preview: string
}

export default function Jobs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await api.get('/jobs')
      return res.data
    },
  })

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading...</div>
  if (error) return <div style={{ padding: '2rem' }}>Failed to load jobs</div>

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Job Opportunities</h1>
      <div>
        {data?.data?.map((job: Job) => (
          <article key={job.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ddd' }}>
            <h2>{job.title}</h2>
            <p>{job.description_preview}</p>
            <Link to={`/jobs/${job.slug}`}>View details</Link>
          </article>
        ))}
      </div>
    </main>
  )
}
