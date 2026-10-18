import axios from 'axios'

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://127.0.0.1:8000/api/v1'

export const api = axios.create({ baseURL })
