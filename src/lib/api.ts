import axios from 'axios'

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost/api/v1'

export const api = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
  },
})
