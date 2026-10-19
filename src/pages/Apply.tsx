import { DragEvent, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { api } from '@/lib/api'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, FileIcon, ShieldIcon, UploadIcon, XIcon } from '@/components/Icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { ItemResponse, JobDetail } from '@/types/api'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const acceptedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

const applicationSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome completo.').max(120, 'O nome deve ter no máximo 120 caracteres.'),
  email: z.string().trim().email('Informe um endereço de e-mail válido.').max(190),
  phone: z.string().trim().max(30, 'O telefone deve ter no máximo 30 caracteres.'),
  resume: z.custom<File>((value) => value instanceof File, 'Selecione um arquivo de currículo.')
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Seu currículo deve ter no máximo 5 MB.')
    .refine((file) => acceptedTypes.includes(file.type) || /\.(pdf|docx)$/i.test(file.name), 'Use um arquivo PDF ou DOCX.'),
})

type ApplicationValues = z.infer<typeof applicationSchema>
type ServerErrors = Record<string, string[]>

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function Apply() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { data: job, isLoading: isLoadingJob, error: jobError } = useQuery({
    queryKey: ['job', slug],
    queryFn: async () => (await api.get<ItemResponse<JobDetail>>(`/jobs/${slug}`)).data.data,
    enabled: Boolean(slug),
    retry: false,
  })

  useDocumentTitle(job ? `Candidatura para ${job.title} | FindHiring` : 'Candidatura | FindHiring')

  const { control, register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { name: '', email: '', phone: '' },
  })

  const submit = async (values: ApplicationValues) => {
    setSubmitError(null)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    if (values.phone) formData.append('phone', values.phone)
    formData.append('resume', values.resume)

    try {
      const response = await api.post(`/jobs/${slug}/applications`, formData, {
        onUploadProgress: (event) => setUploadProgress(event.total ? Math.round((event.loaded / event.total) * 100) : 0),
      })
      navigate('/success', { replace: true, state: { jobTitle: job?.title, applicationId: response.data?.data?.id } })
    } catch (error) {
      if (isAxiosError(error)) {
        const serverErrors = error.response?.data?.errors as ServerErrors | undefined
        if (serverErrors) {
          for (const field of ['name', 'email', 'phone', 'resume'] as const) {
            if (serverErrors[field]?.[0]) setError(field, { message: serverErrors[field][0] })
          }
        }
        setSubmitError(error.response?.data?.message ?? 'Não foi possível enviar sua candidatura. Tente novamente.')
      } else {
        setSubmitError('Não foi possível enviar sua candidatura. Tente novamente.')
      }
    }
  }

  if (isLoadingJob) return <div className="detail-loading"><div className="container"><div className="detail-loading__line" /><div className="detail-loading__title" /><div className="detail-loading__grid"><span /><span /></div></div></div>

  if (jobError || !job) return <section className="standalone-state section-shell"><div className="container state-panel state-panel--error"><span className="state-panel__icon">!</span><h1>Esta vaga não está recebendo candidaturas</h1><p>Ela pode ter sido encerrada ou removida. Conheça as oportunidades disponíveis no momento.</p><Link className="button button--primary" to="/jobs">Ver vagas abertas</Link></div></section>

  return (
    <section className="application-page section-shell">
      <div className="container application-page__container">
        <Link className="back-link" to={slug ? `/jobs/${slug}` : '/jobs'}><ArrowLeftIcon /> Voltar aos detalhes da vaga</Link>
        <div className="application-heading"><span className="eyebrow eyebrow--quiet">Candidatura</span><h1>Candidate-se para {job.title}</h1><p>Informe os dados essenciais abaixo. Os campos marcados com asterisco são obrigatórios.</p></div>

        <div className="application-layout">
          <form className="application-form" onSubmit={handleSubmit(submit)} noValidate>
            <section className="form-section">
              <div className="form-section__heading"><span>1</span><div><h2>Informações de contato</h2><p>Como a equipe de recrutamento poderá identificar e entrar em contato com você.</p></div></div>
              <div className="form-grid">
                <div className="field field--full"><label htmlFor="name">Nome completo <span>*</span></label><input id="name" autoComplete="name" placeholder="Ex.: Mariana Silva" aria-invalid={Boolean(errors.name)} {...register('name')} />{errors.name && <p className="field-error">{errors.name.message}</p>}</div>
                <div className="field"><label htmlFor="email">Endereço de e-mail <span>*</span></label><input id="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" aria-invalid={Boolean(errors.email)} {...register('email')} />{errors.email && <p className="field-error">{errors.email.message}</p>}</div>
                <div className="field"><label htmlFor="phone">Telefone <small>Opcional</small></label><input id="phone" type="tel" autoComplete="tel" placeholder="(11) 99999-0000" aria-invalid={Boolean(errors.phone)} {...register('phone')} />{errors.phone && <p className="field-error">{errors.phone.message}</p>}</div>
              </div>
            </section>

            <section className="form-section">
              <div className="form-section__heading"><span>2</span><div><h2>Seu currículo</h2><p>Envie o documento que melhor representa sua experiência.</p></div></div>
              <Controller
                control={control}
                name="resume"
                render={({ field: { onChange, value } }) => (
                  <div>
                    <input ref={fileInput} className="sr-only" id="resume" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => onChange(event.target.files?.[0])} />
                    {value ? (
                      <div className="selected-file"><span className="selected-file__icon"><FileIcon /></span><div><strong>{value.name}</strong><span>{formatFileSize(value.size)} · Pronto para enviar</span></div><button type="button" onClick={() => { onChange(undefined); if (fileInput.current) fileInput.current.value = '' }} aria-label="Remover currículo selecionado"><XIcon /></button></div>
                    ) : (
                      <div
                        className={`upload-zone ${dragging ? 'upload-zone--dragging' : ''}`}
                        onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragLeave={(event) => { event.preventDefault(); setDragging(false) }}
                        onDrop={(event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer.files?.[0]; if (file) onChange(file) }}
                      >
                        <span className="upload-zone__icon"><UploadIcon /></span><h3>Solte seu currículo aqui</h3><p>ou <button type="button" onClick={() => fileInput.current?.click()}>selecione um arquivo</button></p><span>PDF ou DOCX · Máximo de 5 MB</span>
                      </div>
                    )}
                    {errors.resume && <p className="field-error field-error--center">{errors.resume.message}</p>}
                  </div>
                )}
              />
            </section>

            {submitError && <div className="form-alert" role="alert"><span>!</span><div><strong>Candidatura não enviada</strong><p>{submitError}</p></div></div>}
            {isSubmitting && uploadProgress > 0 && <div className="upload-progress"><div><span>Enviando sua candidatura</span><strong>{uploadProgress}%</strong></div><div><span style={{ width: `${uploadProgress}%` }} /></div></div>}
            <div className="form-submit"><p>Ao enviar, você confirma que as informações fornecidas são verdadeiras.</p><button className="button button--primary button--large" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando candidatura…' : <>Enviar candidatura <ArrowRightIcon /></>}</button></div>
          </form>

          <aside className="application-aside">
            <div className="application-aside__card"><span className="icon-tile"><ShieldIcon /></span><h2>Sua candidatura importa</h2><p>Seu currículo é usado nesta candidatura e analisado com base nos requisitos técnicos da vaga.</p><div><span><CheckIcon /> Análise técnica baseada em competências</span><span><CheckIcon /> Decisões sob responsabilidade do recrutador</span><span><CheckIcon /> Sem decisões automáticas de contratação</span></div></div>
            <div className="application-aside__help"><h2>Antes de enviar</h2><p>Verifique se seu currículo descreve claramente as experiências, tecnologias e responsabilidades relevantes para a vaga.</p></div>
          </aside>
        </div>
      </div>
    </section>
  )
}
