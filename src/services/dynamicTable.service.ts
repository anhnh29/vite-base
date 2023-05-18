import {
  TableDataResponse,
  TableHeaderResponse,
} from 'interfaces/dynamicTable.interface'
import axiosInstance, { errorHandler } from './api.service'

const getTableHeader = async (url: string): Promise<TableHeaderResponse> => {
  return await axiosInstance.get(url).catch(errorHandler)
}

const getTableData = async (
  url: string,
  config: object
): Promise<TableDataResponse> => {
  return await axiosInstance
    .get(url, {
      ...config,
    })
    .catch(errorHandler)
}

const DynamicTableService = {
  getTableHeader,
  getTableData,
}

export default DynamicTableService
