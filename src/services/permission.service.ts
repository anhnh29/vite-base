import { Sitemap } from 'interfaces/sitemap.interface'
import axiosInstance from './api.service'
import { API_AUTH_URL } from 'config'

export interface CheckPermissionRequest {
  sitemapCode: string
  path?: string
}

const checkPermission = async (
  params: CheckPermissionRequest
): Promise<any> => {
  // const {
  // 	data: { allowPermission },
  // } = await axiosInstance.get(`${API_URL}/check-permission`, { params });

  // return allowPermission;
  return await Promise.resolve(true)
}

const getSitemaps = async (): Promise<Sitemap[]> => {
  const { data } = await axiosInstance.get(`${API_AUTH_URL}/sitemaps`)
  return data.data.sitemaps as Sitemap[]
}

const PermissionService = {
  checkPermission,
  getSitemaps,
}

export default PermissionService
