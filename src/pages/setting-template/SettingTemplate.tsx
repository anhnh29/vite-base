import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  Counter,
  DynamicTable as DynamicTableDNH,
  DynamicTableProvider,
} from '@dnh/dynamic-table'
import { Button, Card, Popconfirm, Row, Space } from 'antd'
import DynamicTable from 'components/Table/DynamicTable'
import { API_SERVICES_URL } from 'config'
import {
  ITableFilter,
  ITableRef,
  TableColumn,
} from 'interfaces/dynamicTable.interface'
import axiosInstance from 'services/api.service'

import { ITemplate } from 'interfaces/template.interface'
import { FC, ReactNode, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TemplateApiService from 'services/template.service'
import ToastService from 'services/toast.service'
const defaultFilters: ITableFilter[] = [
  {
    field: 'isDefault',
    logic: 'AND',
    operator: 'eq',
    value: 'true',
  },
]

const SettingTemplate: FC = () => {
  const navigate = useNavigate()
  const tableRef = useRef<ITableRef>(null)

  const actionColumns: TableColumn = useMemo(() => {
    const deleteTemplate = async (uid: string): Promise<any> => {
      const result = await TemplateApiService.deleteTemplate(uid)
      if (result) {
        ToastService.showToastMsg('Template deleted', 'info')
        tableRef.current?.loadData()
      }
    }
    return {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (text: any, record: ITemplate): ReactNode => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => {
              navigate(`/setting-template/${record.uid as string}`)
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete Template"
            description="Are you sure to delete this template?"
            onConfirm={async () => {
              return await deleteTemplate(record.uid)
            }}
            placement="topLeft"
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    }
  }, [navigate])
  const languageColumn: TableColumn = useMemo(() => {
    return {
      title: 'Language',
      dataIndex: 'language',
      key: 'Language',
      render: (text, record) => <span>{record.language?.name}</span>,
    }
  }, [])

  return (
    <>
      <Counter />
      <Row justify={'end'} className="mb-4">
        <Button
          type="primary"
          onClick={() => {
            navigate('/setting-template/save')
          }}
        >
          Add new template
        </Button>
      </Row>
      <Card>
        <DynamicTable<ITemplate>
          ref={tableRef}
          headerUrl={'templates/dynamic/fields'}
          dataTableUrl={'templates/paging/v2'}
          baseURL={API_SERVICES_URL || ''}
          rowKey={(record: ITemplate) => record.uid}
          customColumns={[languageColumn, actionColumns]}
          searchableConfig={{
            layout: 'inline',
          }}
          defaultFilters={defaultFilters}
          displayColumns={['templateCode', 'subject', 'language', 'action']}
          relations="language"
          urlSync
        />
        <DynamicTableProvider axiosInstance={axiosInstance}>
          <DynamicTableDNH<ITemplate>
            ref={tableRef}
            headerUrl={'templates/dynamic/fields'}
            dataTableUrl={'templates/paging/v2'}
            baseURL={API_SERVICES_URL || ''}
            rowKey={(record: ITemplate) => record.uid}
            customColumns={[languageColumn, actionColumns]}
            searchableConfig={{
              layout: 'inline',
            }}
            defaultFilters={defaultFilters}
            displayColumns={['templateCode', 'subject', 'language', 'action']}
            relations="language"
            urlSync
          />
        </DynamicTableProvider>
      </Card>
    </>
  )
}

export default SettingTemplate
