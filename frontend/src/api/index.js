import axios from 'axios'

const uploadInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

uploadInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data)
    }
  }
)

const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

baseInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data)
    }
  }
)

export { baseInstance, uploadInstance }
