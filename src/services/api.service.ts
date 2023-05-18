import axios from 'axios'
import AuthService from './auth.service'
import StorageService from './storage.service'
import ToastService from './toast.service'
import { API_KEY, IDENTITY_AUTH_URL, IDENTITY_CLIENT_ID } from 'config'

const axiosInstance = axios.create({
  headers: {
    Accept: 'applications/json',
    'Content-Type': 'application/json',
    'api-key': `${API_KEY}`,
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const oidcAuth = StorageService.getItem(
      `oidc.user:${IDENTITY_AUTH_URL}:${IDENTITY_CLIENT_ID}`
    )

    if (oidcAuth) {
      config.headers.Authorization = `Bearer ${
        (oidcAuth.access_token as string) ?? ''
      }`
    }

    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    const res = response.data
    switch (res.code || res.meta.code) {
      case 200000:
        return res
      case 200: // OK
        return res.data
      case 401: // Unauthorized:
        ToastService.showToastMsg(res.message)
        AuthService.logout()
        return await Promise.reject(res)
      case 404: // Not found
      case 500: // Internal Server Error:
      case 400: // Bad Request
        ToastService.showToastMsg(res.message)
        return await Promise.reject(res.message)
      default:
        return await Promise.reject(res.message || 'Unknown error occurred')
    }
  },
  async (error) => {
    const message = error.message || error.toString()
    ToastService.showToastMsg(message)
    return await Promise.reject(message)
  }
)

export const errorHandler = async (e: any): Promise<any> => {
  console.error(e)
  return null
}

export default axiosInstance
