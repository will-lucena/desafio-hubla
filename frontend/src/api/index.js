import axios from 'axios'

export const uploadInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
