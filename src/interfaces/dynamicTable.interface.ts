import { TablePaginationConfig, TableProps } from 'antd'
import { FormLayout } from 'antd/es/form/Form'
import { ColumnsType, ColumnType } from 'antd/es/table'
import React from 'react'

export function isFilterMode(value: string | null): value is TableMode {
  return !!value && ['searchable', 'filter'].includes(value)
}

export interface TableOperator {
  key: string
  value: string
  label: string
}

export interface ITableFilter {
  id?: string
  field: string
  labelField?: string | React.ReactNode
  operator: Operator
  labelOperator?: string
  value: string
  logic: TableLogic
}

export type Operator =
  | 'eq'
  | 'neq'
  | 'in'
  | 'nin'
  | 'lt'
  | 'lte'
  | 'mt'
  | 'mte'
  | 'cons'
  | 'startswith'
  | 'endswith'
  | 'notnull'

export interface TableSort {
  field: string
  order: 'asc' | 'desc'
}

export interface TablePagination extends TablePaginationConfig {
  limit?: number
  totalItem?: number
  page?: number
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export type Size = 'large' | 'middle' | 'small'
export type TableMode = 'filter' | 'searchable'
export type TableLogic = 'AND' | 'OR'
export type TableColumnType = 'text' | 'date' | 'number' | 'boolean'
export type SearchableType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'option'
  | 'date'
  | 'week'
  | 'month'
  | 'year'
  | 'quarter'
export interface Searchable {
  field: string
  label?: string | string[]
  description?: string
  type: SearchableType
  value?: any
  operator?: 'cons'
  logic?: 'AND'

  // Style
  hideIcon?: boolean
  labelAlign?: 'left' | 'right'
  size?: Size

  // Grid
  labelCol?: number
  labelOffsetCol?: number
  wrapperCol?: number
  wrapperOffsetCol?: number
  baseCol?: 24

  // Select
  isSelectMultiple?: boolean
  selectOptions?: Array<{ label: string; value: any }>

  // Date
  format?: string
  showRangeDate?: boolean
  showTime?: boolean
  rangeDateLabel?: [string, string]
}

export interface TableColumn extends ColumnType<any> {
  dataIndex: string
  title: string
  type?: TableColumnType
  name?: string
}

export interface TableDataRequest {
  pagination?: TablePagination
  filters?: ITableFilter[]
  sorts?: TableSort[]
  search?: any
  relations?: string[] | string
  mode?: TableMode
}

export interface TableDataResponse {
  data: any[]
  meta: {
    paginationOptionsDto: {
      limit: number
      page: number
    }
    totalItem: number
  }
}

export interface TableHeaderResponse {
  columns: TableColumn[]
  operators: TableOperator[]
  logics: TableLogic[]
  searchables?: Searchable[]
}

export interface TableSearchableConfig {
  layout?: FormLayout
  className?: string
  validateMessages?: any
}

export interface TableFilterConfig {
  metrics?: TableOperator[]
}

export interface TableCProps<T> extends TableProps<any> {
  headerUrl: string
  dataTableUrl: string
  baseURL: string
  sortColumns?: string[]
  customColumns?: ColumnsType<T>
  filterColumns?: string[]
  displayColumns?: string[]
  size?: Size
  rowKey: any
  searchableConfig?: TableSearchableConfig
  filterConfig?: TableFilterConfig
  defaultFilters?: ITableFilter[]
  urlSync?: boolean
  relations?: string
}

export interface ITableRef {
  loadData: () => Promise<any>
}
