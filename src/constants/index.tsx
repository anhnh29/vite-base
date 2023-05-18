import { TablePaginationConfig } from 'antd'

export const PaginationConfig: TablePaginationConfig = {
  current: 1,
  pageSize: 10,
  total: 0,
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  showQuickJumper: false,
}

export const Operators = [
  {
    key: 'eq',
    value: 'eq',
    label: 'equal',
  },
  {
    key: 'neq',
    value: 'neq',
    label: 'not equal',
  },
  {
    key: 'in',
    value: 'in',
    label: 'in',
  },
  {
    key: 'nin',
    value: 'nin',
    label: 'not in',
  },
  {
    key: 'lt',
    value: 'lt',
    label: 'less than',
  },
  {
    key: 'lte',
    value: 'lte',
    label: 'less than or equal',
  },
  {
    key: 'mt',
    value: 'mt',
    label: 'more than',
  },
  {
    key: 'mte',
    value: 'mte',
    label: 'more than or equal',
  },
  {
    key: 'cons',
    value: 'cons',
    label: 'contains',
  },
  {
    key: 'startswith',
    value: 'startswith',
    label: 'starts with',
  },
  {
    key: 'endswith',
    value: 'endswith',
    label: 'ends with',
  },
  {
    key: 'notnull',
    value: 'notnull',
    label: 'not null',
  },
]

export const TENENT_SETTINGS = 'tenant-settings'
export const LOCALE = 'locale'
export const pathNameLocalStorage = 'current-path'
export const defaultTemplateLanguage = 'en-US'
