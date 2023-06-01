/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Row, Select, Tag } from 'antd'
import { ReactComponent as DownSvg } from 'assets/down.svg'
import ModalC from 'components/Modal'
import dayjs from 'dayjs'
import {
  ITableFilter,
  TableColumnType,
  TableOperator,
} from 'interfaces/dynamicTable.interface'
import React, { ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getValidateMessage } from 'utils/validations/messages'
import { Operators } from '../../constants'
import { DefaultOptionType } from 'antd/es/select'

export interface IFiltersProps {
  onFilter: (args: ITableFilter[]) => void
  operators: TableOperator[]
  properties: IProperty[]
  filters: ITableFilter[]
}

export interface IOption {
  label: string
  value: string
  disabled?: boolean
}

export interface IProperty extends Omit<DefaultOptionType, 'label'> {
  type?: TableColumnType
  label: string | ReactNode
  format?: string
}

const dateFormat = 'DD/MM/YYYY'

const DynamicField = ({ type, ...rest }: { type: string }): JSX.Element => {
  switch (type) {
    case 'string':
      return <Input size={'large'} {...rest} />
    case 'date':
      return <DatePicker size={'large'} format={dateFormat} {...rest} />
    default:
      return <>Not supported</>
  }
}
const formatValue = (value: any): any => {
  if (dayjs(value, dateFormat).isValid()) return dayjs(value).format(dateFormat)
  return value
}
export default function Filters({
  onFilter,
  operators,
  properties,
  filters,
}: IFiltersProps): JSX.Element {
  const { t } = useTranslation('common')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [filterOpen, setFilterOpen] = useState<boolean>(true)
  const [form] = Form.useForm<ITableFilter>()
  const operator = Form.useWatch('operator', form)
  const field = Form.useWatch('field', form)
  const fieldType = properties.find((item) => item.value === field)?.type

  const onCancel = (): void => {
    form.resetFields()
    setOpenModal(false)
  }

  const onDeletedTag = (
    e: React.MouseEvent<HTMLElement>,
    id?: string
  ): void => {
    e.preventDefault()
    onFilter(filters.filter((f) => f.id !== id))
  }

  const onApplyFilter = (): void => {
    void form.validateFields().then((filter) => {
      const payload: ITableFilter = {
        id: filter.id ?? Date.now().toString(),
        field: filter.field,
        operator: filter.operator,
        logic: 'AND',
        value: formatValue(filter.value),
        labelField: properties.find((el) => el.value === filter.field)?.label,
        labelOperator: Operators.find((el) => el.key === filter.operator)
          ?.label,
      }
      console.log(operators);
      console.log(filter);
      if (filter.id) {
        onFilter(filters.map((f) => (f.id === filter.id ? payload : f)))
      } else {
        onFilter([...filters, payload])
      }
      setOpenModal(false)
      onCancel()
    })
  }

  const showModal = (filter?: ITableFilter): void => {
    if (filter) {
      form.setFieldsValue({
        field: filter.field,
        operator: filter.operator,
        value: formatValue(filter.value),
      })
    }
    setOpenModal(true)
  }

  const operatorOptions: IOption[] = useMemo(
    () =>
      operators.map((o) => {
        // return {
        //   value: o.value,
        //   label: o.key
        // }
        const origin = Operators.find((op) => op.key === o.value)
        return {
          value: o.value,
          label: origin?.label ?? o.value,
          disabled: origin?.disabled,
        }
      }),
    [operators]
  )

  return (
    <>
      <Row gutter={[16, 16]} className="my-4">
        <Col span={24} className="flex items-center justify-between">
          <div className="flex w-fit text-xl font-bold">
            {t('filter.title')}
          </div>
          <Row justify={'end'}>
            <Button
              type="default"
              icon={
                <DownSvg
                  className={
                    'h-3 w-3 ' +
                    (filterOpen
                      ? 'rotate-180 duration-500 ease-in-out'
                      : 'rotate-0 duration-500 ease-in-out')
                  }
                />
              }
              className={
                'flex flex-row-reverse items-center justify-between gap-x-2'
              }
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {t('filter.filters')}
            </Button>
          </Row>
        </Col>
        <Col span={24}>
          {filterOpen && (
            <Row>
              {filters.length !== 0 &&
                filters.map((filter) => (
                  <Tag
                    className="flex cursor-pointer items-center py-1"
                    key={filter.id}
                    closable
                    onClose={(e) => onDeletedTag(e, filter.id)}
                    onClick={() => showModal(filter)}
                  >
                    <span className="ms-0">
                      <b>{filter.labelField}</b> {filter.labelOperator}{' '}
                      <b>{filter.value}</b>
                    </span>
                  </Tag>
                ))}
              <Button
                type="default"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
              >
                {t('filter.add_filter')}
              </Button>
            </Row>
          )}
        </Col>
      </Row>
      <ModalC
        open={openModal}
        onOk={onApplyFilter}
        onCancel={onCancel}
        width={420}
        okText={t('filter.apply_filter')}
        okButtonProps={{
          htmlType: 'submit',
        }}
      >
        <Form
          id="filter-form"
          layout="vertical"
          form={form}
          initialValues={{
            field: '',
            metric: '',
            value: '',
          }}
          validateMessages={getValidateMessage()}
        >
          <Form.Item name={'id'} noStyle hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label={t('filter.field')}
            name="field"
            required
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder={t('filter.select.field')}
              options={properties}
              size={'large'}
            ></Select>
          </Form.Item>
          <Form.Item
            label={t('filter.operator')}
            name="operator"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder={t('filter.select.operator')}
              options={operatorOptions}
              disabled={!field}
              size={'large'}
            ></Select>
          </Form.Item>
          {operator && fieldType && (
            <Form.Item
              label={t('filter.value')}
              name="value"
              required
              wrapperCol={{
                span: 24,
              }}
              style={{
                width: '100%',
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DynamicField type={fieldType} />
            </Form.Item>
          )}
        </Form>
      </ModalC>
    </>
  )
}
