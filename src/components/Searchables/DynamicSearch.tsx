import {
  Checkbox,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd'
import { FormLayout } from 'antd/es/form/Form'
import { FC, useEffect, useState } from 'react'
import { Searchable } from 'interfaces/dynamicTable.interface'
import { ReactComponent as SearchSvg } from 'assets/search.svg'
import Icon from '@ant-design/icons'
import './Searchables.scss'
import { RangePickerProps } from 'antd/es/date-picker'
import { debounce, isArray, omit } from 'lodash-es'
import dayjs from 'dayjs'
import { getValidateMessage } from 'utils/validations/messages'
import { useTranslation } from 'react-i18next'

interface SearchablesProps {
  layout: FormLayout
  searchables: Searchable[]
  initialSearchables?: Record<string, string>
  className?: string
  validateMessages?: any
  onSearch: (search: any) => void
}

const Searchables: FC<SearchablesProps> = ({
  searchables,
  initialSearchables,
  layout,
  className,
  validateMessages,
  onSearch,
}) => {
  const { t } = useTranslation('common')
  const [form] = Form.useForm()
  const [payload, setSearchablePayload] = useState(initialSearchables)

  useEffect((): void => {
    const result: Record<string, any> = {}
    if (searchables?.length) {
      for (const key in initialSearchables) {
        const searchableItem = searchables.find((item) => item.field === key)
        if (
          searchableItem &&
          ['date' || 'week' || 'month' || 'year' || 'quarter'].includes(
            searchableItem.type
          )
        ) {
          result[key] = dayjs(initialSearchables[key])
        } else result[key] = initialSearchables[key]
      }
    }
    form.setFieldsValue(result)
  }, [form, initialSearchables, searchables])

  const renderCol = (
    item: Searchable,
    type: 'label' | 'wrapper' = 'label'
  ): any => {
    const antdCol = 24
    const baseCol = item.baseCol || 24
    const span = type === 'label' ? item.labelCol : item.wrapperCol
    const offset =
      type === 'label' ? item.labelOffsetCol : item.wrapperOffsetCol

    const test = {
      span: span ? (span * antdCol) / baseCol : baseCol,
      offset: offset || 0,
    }

    return test
  }

  const onHandleChange = debounce((field: string): void => {
    if (
      form.getFieldValue(field) ||
      (isArray(form.getFieldValue(field)) && form.getFieldValue(field).length)
    ) {
      setSearchablePayload((prev: any) => ({
        ...prev,
        [field]: form.getFieldValue(field),
      }))
      onSearch({
        ...payload,
        [field]: form.getFieldValue(field),
      })
    } else {
      setSearchablePayload((prev: any) => {
        return omit(prev, field)
      })
      onSearch(omit(payload, field))
    }
  }, 1000)

  const onChangeDateAndRangePicker = (
    date: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
    field: string
  ): void => {
    if (date) {
      setSearchablePayload((prev: any) => ({
        ...prev,
        [field]: dateString,
      }))
      onSearch({
        ...payload,
        [field]: dateString,
      })
    } else {
      setSearchablePayload((prev: any) => {
        return omit(prev, field)
      })
      onSearch(omit(payload, field))
    }
  }

  const renderComponent = (item: Searchable): JSX.Element => {
    switch (item.type) {
      case 'text':
        return (
          <Input
            placeholder={item.description}
            size={item.size || 'large'}
            prefix={!item.hideIcon && <Icon component={SearchSvg} />}
            onChange={() => {
              onHandleChange(item.field)
            }}
          />
        )
      case 'number':
        return (
          <InputNumber
            placeholder={item.description}
            size={item.size || 'large'}
            onChange={() => {
              onHandleChange(item.field)
            }}
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            onChange={() => {
              onHandleChange(item.field)
            }}
          >
            {item.description}
          </Checkbox>
        )
      case 'option':
        return item.selectOptions?.length ? (
          item.isSelectMultiple ? (
            <Select
              allowClear
              size={item.size || 'large'}
              options={item.selectOptions}
              placeholder={item.description}
              mode="multiple"
              maxTagCount="responsive"
              onChange={() => {
                onHandleChange(item.field)
              }}
            />
          ) : (
            <Select
              size={item.size || 'large'}
              allowClear
              options={item.selectOptions}
              placeholder={item.description}
            />
          )
        ) : (
          <></>
        )
      case 'date':
      case 'week':
      case 'month':
      case 'quarter':
      case 'year':
        return item.showRangeDate ? (
          <DatePicker.RangePicker
            picker={item.type}
            size={item.size || 'large'}
            format={item.format}
            showTime={item.showTime}
            placeholder={item.rangeDateLabel}
            onChange={(date, dateString) => {
              onChangeDateAndRangePicker(date, dateString, item.field)
            }}
          />
        ) : (
          <DatePicker
            placeholder={item.description}
            picker={item.type}
            size={item.size || 'large'}
            format={item.format}
            showTime={item.showTime}
            onChange={(date, dateString) => {
              onChangeDateAndRangePicker(date, dateString, item.field)
            }}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <>
      <div className="flex w-fit py-3 text-xl font-bold">{t('search')}</div>
      <Form
        form={form}
        layout={layout}
        rootClassName="searchable-form"
        className="px-0 py-[1rem]"
        validateMessages={getValidateMessage()}
      >
        {searchables.map((item) => (
          <Form.Item
            label={item.label}
            name={item.field}
            wrapperCol={renderCol(item, 'wrapper')}
            labelCol={renderCol(item)}
            labelAlign={item.labelAlign || 'left'}
            key={item.field}
            valuePropName={
              ['checkbox'].includes(item.type) ? 'checked' : undefined
            }
          >
            {renderComponent(item)}
          </Form.Item>
        ))}
      </Form>
    </>
  )
}

export default Searchables
