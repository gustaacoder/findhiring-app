import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '@/lib/api'

export default function Apply() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !slug) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('resume', file)

    try {
      await api.post(`/jobs/${slug}/applications`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/success')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Apply</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Résumé (PDF or DOCX)</label>
          <input required type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </main>
  )
}
