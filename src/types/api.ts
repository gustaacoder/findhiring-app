export type Job = {
  id: number
  title: string
  slug: string
  description: string
  description_preview: string
  published_at: string | null
}

export type Requirement = {
  name: string
  description: string
  expected_evidence?: string | null
}

export type JobDetail = Job & {
  requirements: {
    required: Requirement[]
    preferred: Requirement[]
  }
}

export type PaginatedResponse<T> = {
  data: T[]
  links: { first: string | null; last: string | null; prev: string | null; next: string | null }
  meta: { current_page: number; from: number | null; last_page: number; path: string; per_page: number; to: number | null; total: number }
}

export type ItemResponse<T> = { data: T }
