import { PartialTemplate } from 'interfaces/template.interface'
import axiosInstance, { errorHandler } from './api.service'
import { TableDataRequest } from 'interfaces/dynamicTable.interface'
import { API_SERVICES_URL } from 'config'
const API_URL = `${API_SERVICES_URL}`
const TemplateApiService = {
  getTemplates: async (params: TableDataRequest): Promise<any> =>
    await axiosInstance
      .get(`${API_URL}/templates/paging/v2`, {
        params: {
          filter: JSON.stringify(params),
        },
      })
      .catch(errorHandler),
  getTemplateDetail: async (uid: string, params = {}) =>
    await axiosInstance
      .get(`${API_URL}/templates/${uid}/v2`, { params })
      .catch(errorHandler),
  addTemplate: async (data: PartialTemplate): Promise<any> =>
    await axiosInstance.post(`${API_URL}/templates`, data).catch(errorHandler),
  updateTemplate: async (data = {}, id: string): Promise<any> =>
    await axiosInstance
      .put(`${API_URL}/templates/${id}`, data)
      .catch(errorHandler),
  deleteTemplate: async (id: string) =>
    await axiosInstance
      .delete(`${API_URL}/templates/${id}`)
      .catch(errorHandler),
  getTemplateParam: async (uid: string) =>
    await axiosInstance
      .get(`${API_URL}/templates/${uid}/params`)
      .catch(errorHandler),
  addTemplateParam: async (name: string, temId: string) =>
    await axiosInstance
      .post(`${API_URL}/params`, {
        name,
        templates: [{ uid: temId }],
      })
      .catch(errorHandler),
  deleteTemplateParam: async (uid: string) =>
    await axiosInstance.delete(`${API_URL}/params/${uid}`).catch(errorHandler),
}
export default TemplateApiService
