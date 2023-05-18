import { Row, Select } from 'antd'
import Table from 'antd/es/table'
import Filters from 'components/Filter/DynamicFilter'
import Searchables from 'components/Searchables/DynamicSearch'
import useDynamicTable from 'hooks/useDynamicTable'
import {
  ITableRef,
  TableCProps,
  ITableFilter,
} from 'interfaces/dynamicTable.interface'
import { pick } from 'lodash-es'
import React, { useImperativeHandle } from 'react'
import { getValidateMessage } from 'utils/validations/messages'

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

function DynamicTableInner<T>(
  {
    headerUrl,
    dataTableUrl,
    baseURL,
    sortColumns,
    customColumns,
    size,
    rowKey,
    searchableConfig,
    filterConfig,
    defaultFilters,
    filterColumns,
    displayColumns,
    urlSync,
    relations,
    ...others
  }: TableCProps<T>,
  ref: React.ForwardedRef<ITableRef>
): JSX.Element {
  const {
    records,
    columns,
    handleChange,
    pagination,
    filters,
    mode,
    setMode,
    isLoading,
    operators,
    properties,
    searchables,
    loadData,
    changeFilter,
  } = useDynamicTable<T>({
    headerUrl,
    dataTableUrl,
    baseURL,
    sortColumns,
    customColumns,
    defaultFilters,
    filterColumns,
    urlSync,
    displayColumns,
    relations,
  })

  useImperativeHandle(ref, () => ({ loadData }), [loadData])

  const onFilter = (filters: ITableFilter[]): void => {
    changeFilter(filters)
    // setFilters(filters);
    // setPagination((old: TablePagination) => ({ ...old, current: 1 }));
  }

  const onSearch = (payload: any): void => {
    const newFilter: ITableFilter[] = []
    for (const key in payload) {
      newFilter.push({
        field: key,
        value: payload[key],
        operator: 'eq',
        logic: 'AND',
      })
    }
    changeFilter(newFilter)
  }

  const tableComponent: JSX.Element = (
    <Table
      columns={columns}
      dataSource={records}
      onChange={handleChange}
      size={size || 'middle'}
      loading={isLoading}
      pagination={{
        ...pick(pagination, 'current', 'pageSize', 'total'),
        position: ['bottomCenter'],
      }}
      rowKey={rowKey}
      {...others}
    />
  )

  const dynamicFilterComponent: JSX.Element = (
    <Filters
      onFilter={onFilter}
      properties={properties}
      operators={filterConfig?.metrics || operators}
      filters={filters}
    />
  )

  const searchableComponent: JSX.Element = (
    <Searchables
      searchables={searchables}
      initialSearchables={filters}
      layout={searchableConfig?.layout || 'vertical'}
      className={searchableConfig?.className}
      validateMessages={
        searchableConfig?.validateMessages || getValidateMessage()
      }
      onSearch={onSearch}
    />
  )

  return (
    <div className="my-4">
      <Row justify={'end'}>
        <Select
          onChange={(val) => {
            setMode(val)
          }}
          value={mode}
          options={[
            {
              label: 'Search View',
              value: 'searchable',
            },
            {
              label: 'Filter View',
              value: 'filter',
            },
          ]}
        />
      </Row>
      {mode === 'filter' && dynamicFilterComponent}
      {mode === 'searchable' && searchableComponent}
      {tableComponent}
    </div>
  )
}

const DynamicTable = React.forwardRef(DynamicTableInner)

export default DynamicTable
