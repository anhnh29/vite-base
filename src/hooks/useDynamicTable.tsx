import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { TablePaginationConfig } from 'antd'
import { ColumnType, ColumnsType, SorterResult } from 'antd/es/table/interface'
import { IProperty } from 'components/Filter/DynamicFilter'
import dayjs from 'dayjs'
import { capitalize, pick } from 'lodash-es'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Operators, PaginationConfig } from '../constants'
import {
  ITableFilter,
  Searchable,
  TableColumn,
  TableDataRequest,
  TableLogic,
  TableMode,
  TableOperator,
  TablePagination,
  TableSort,
  isFilterMode,
} from '../interfaces/dynamicTable.interface'
import DynamicTableService from '../services/dynamicTable.service'
import {
  handleParseObject,
  isEmptyPagination,
  queryStringToObject,
  removeEmptyValueInObject,
  sortInforWithDir,
} from '../utils'

interface UseDynamicTableProps<T> {
  headerUrl: string
  dataTableUrl: string
  baseURL: string
  sortColumns?: string[]
  customColumns?: ColumnsType<T>
  defaultFilters?: ITableFilter[]
  filterColumns?: string[]
  displayColumns?: string[]
  urlSync?: boolean
  relations?: string
}
interface UseDynamicTableReturnType<T> {
  loadData: any
  records: T[]
  columns: TableColumn[]
  operators: any
  logics: any
  sorts: any
  pagination: TablePagination
  filters: any
  isLoading: any
  properties: any
  searchables: any
  setMode: (mode: TableMode) => void
  mode: TableMode
  setPagination: any
  handleChange: any
  changeFilter: (newFilter: ITableFilter[]) => void
}

export default function useDynamicTableV2<T>({
  headerUrl,
  dataTableUrl,
  baseURL,
  sortColumns,
  customColumns = [],
  defaultFilters = [],
  filterColumns,
  displayColumns,
  urlSync,
  relations,
}: UseDynamicTableProps<T>): UseDynamicTableReturnType<T> {
  // Header Response
  const [columns, setColumns] = useState<TableColumn[]>([])
  const [operators, setOperators] = useState<TableOperator[]>(Operators)
  const [logics, setLogics] = useState<TableLogic[]>(['AND', 'OR'])
  const [searchableCol, setSearchableCol] = useState<Searchable[]>([])
  // Data Response
  const [records, setRecords] = useState<T[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isHeaderLoading, setIsHeaderLoading] = useState(false)

  // Set default data
  const urlQueries: TableDataRequest = useMemo(() => {
    const queries: TableDataRequest = {}
    if (!urlSync) {
      return queries
    }
    const pagination = searchParams.get('pagination')
    const mode = searchParams.get('mode')
    const filters: any[] = searchParams.getAll('filters')
    const sorts: any[] = searchParams.getAll('sorts')
    const paginationObj = pagination ? queryStringToObject(pagination) : {}
    queries.pagination = {}
    paginationObj.page &&
      (queries.pagination.current = Number(paginationObj.page))
    paginationObj.limit &&
      (queries.pagination.pageSize = Number(paginationObj.limit))
    queries.mode = isFilterMode(mode) ? mode : 'filter'
    if (filters.length) {
      filters.forEach((el: any, idx: any) => {
        filters[idx] = queryStringToObject(el)
      })
      queries.filters = filters
    }

    if (sorts.length) {
      sorts.forEach((el: any, idx: any) => {
        sorts[idx] = queryStringToObject(el)
      })
      queries.sorts = sorts
    }
    return queries
  }, [searchParams, urlSync])

  const [mode, setMode] = useState<TableMode>(urlQueries.mode ?? 'filter')

  // Support query
  const [pagination, setPagination] = useState<TablePagination>(
    pick(
      {
        ...PaginationConfig,
        ...(urlQueries.pagination ?? {}),
      },
      ['current', 'pageSize', 'total']
    )
  )

  const [sorts, setSorts] = useState<TableSort[]>(urlQueries.sorts ?? [])
  const [filters, setFilters] = useState<ITableFilter[]>(
    urlQueries.filters ?? []
  )

  const [searchableFilter, setSearchableFilter] = useState<ITableFilter[]>(
    urlQueries.filters ?? []
  )

  const tableColumns: TableColumn[] = useMemo(() => {
    const initialCols = columns
      .filter(
        (c) =>
          !customColumns?.find(
            (cu) => (cu as ColumnType<T>).dataIndex === c.dataIndex
          )
      )
      .map((el: TableColumn) => {
        const res: TableColumn = {
          dataIndex: el.dataIndex,
          title: capitalize(el.name),
          type: el.type,
          render: (value, record, index): ReactNode => {
            switch (el.type) {
              case 'boolean':
                value = value ? (
                  <CheckCircleFilled
                    style={{
                      color: '#52c41a',
                    }}
                  />
                ) : (
                  <CloseCircleFilled
                    style={{
                      color: 'red',
                    }}
                  />
                )
                break
              case 'date':
                if (value && dayjs(value).isValid()) {
                  value = dayjs(value).format('DD/MM/YYYY, hh:mm')
                }
                break
              default:
                value = value || '-'
                break
            }
            return value
          },
        }

        if (sortColumns?.includes(el.dataIndex)) {
          res.sorter = {
            compare: () => 1,
            multiple: sortColumns?.length,
          }
          res.sortOrder = sortInforWithDir(el.dataIndex, sorts)
        }

        return res
      })
    const allCols = customColumns
      ? [...initialCols, ...(customColumns as TableColumn[])]
      : [...initialCols]

    return allCols
      .filter(
        (c) =>
          !displayColumns || displayColumns?.find((cu) => cu === c.dataIndex)
      )
      .sort((colA, colB) => {
        if (!displayColumns) {
          return 1
        }
        return (
          displayColumns.findIndex((c) => c === colA.dataIndex) -
          displayColumns.findIndex((c) => c === colB.dataIndex)
        )
      })
  }, [sortColumns, sorts, columns, customColumns, displayColumns])

  const stringQuery = useMemo(() => {
    const finalFilter = mode === 'filter' ? filters : searchableFilter
    return JSON.stringify({
      pagination: {
        page: pagination.current,
        limit: pagination.pageSize,
      },
      sorts,
      filters: [
        ...finalFilter.map((f) =>
          removeEmptyValueInObject(
            pick(f, ['field', 'logic', 'operator', 'value'])
          )
        ),
        ...defaultFilters,
      ],
      relations,
    })
  }, [
    pagination,
    sorts,
    filters,
    defaultFilters,
    searchableFilter,
    mode,
    relations,
  ])

  const properties: IProperty[] = useMemo(() => {
    return columns
      .filter(
        (c) => !filterColumns || filterColumns?.find((cu) => cu === c.dataIndex)
      )
      .map((el) => {
        return {
          label: capitalize(el.name),
          value: el.dataIndex,
          type: el.type,
        }
      })
  }, [columns, filterColumns])
  const loadColumn = useCallback(async () => {
    setIsHeaderLoading(true)
    const headerRes = await DynamicTableService.getTableHeader(
      `${baseURL}/${headerUrl}`
    )
    setIsHeaderLoading(false)
    if (headerRes) {
      const { columns: baseColumns, logics, operators, searchables } = headerRes
      baseColumns && setColumns(baseColumns)
      operators && setOperators(operators)
      logics && setLogics(logics)
      searchables && setSearchableCol(searchables)
    }
  }, [baseURL, headerUrl])
  useEffect(() => {
    void loadColumn()
  }, [loadColumn])

  const loadData = useCallback(async () => {
    if (stringQuery === null) return
    setIsLoading(true)
    const dataRes = await DynamicTableService.getTableData(
      `${baseURL}/${dataTableUrl}`,
      {
        params: {
          filter: stringQuery,
        },
      }
    )
    setIsLoading(false)
    if (dataRes) {
      const { data, meta } = dataRes
      if (!isEmptyPagination(meta.paginationOptionsDto)) {
        setPagination((prevPagination) => {
          return {
            ...prevPagination,
            current: Number(meta.paginationOptionsDto.page),
            pageSize: Number(meta.paginationOptionsDto.limit),
            total: Number(meta.totalItem),
          }
        })
      }
      data && setRecords(data)
    }
  }, [baseURL, dataTableUrl, stringQuery])
  useEffect(() => {
    void loadData()
  }, [loadData])

  useEffect(() => {
    if (!urlSync) return
    let queries: TableDataRequest = {
      pagination: {
        page: pagination.current,
        limit: pagination.pageSize,
      },
      filters,
      sorts,
      mode,
    }
    queries = handleParseObject(queries)
    setSearchParams(queries as URLSearchParams)
  }, [pagination, filters, sorts, setSearchParams, urlSync, mode])

  const handleChange = (
    paging: TablePaginationConfig,
    _: any,
    sorter: SorterResult<object>
  ): void => {
    let tmpSorts: TableSort[] = []

    if (!Array.isArray(sorter)) {
      tmpSorts = sorter.order
        ? [
            {
              field: sorter.field as string,
              order: sorter.order === 'ascend' ? 'asc' : 'desc',
            },
          ]
        : []
    } else {
      tmpSorts = []
      ;(sorter as []).forEach((sorterEl: any) => {
        sorterEl.order &&
          tmpSorts.push({
            field: sorterEl.field as string,
            order: sorterEl.order === 'ascend' ? 'asc' : 'desc',
          })
      })
    }
    setPagination(pick(paging, ['total', 'current', 'pageSize']))
    setSorts(tmpSorts)
  }

  const changeFilter = useCallback(
    (newFilter: ITableFilter[]) => {
      mode === 'filter' ? setFilters(newFilter) : setSearchableFilter(newFilter)
      setPagination((old: TablePagination) => ({
        ...old,
        current: 1,
      }))
    },
    [mode]
  )

  return {
    loadData,
    records,
    columns: tableColumns,
    operators,
    logics,
    sorts,
    pagination,
    filters,
    isLoading: isLoading || isHeaderLoading,
    properties,
    searchables: searchableCol,
    mode,
    setMode,
    setPagination,
    handleChange,
    changeFilter,
  }
}
