import Select from 'antd/es/select'
import { FC, ReactNode } from 'react'
import { useAppDispatch } from 'stores'
import { getSitemaps } from 'stores/common.slices'
import { useTranslation } from 'react-i18next'

const SwitchLanguage: FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const locales = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'vi',
      label: 'Vietnamese',
    },
  ]

  const handleChange = (option: { value: string; label: ReactNode }): void => {
    void i18n.changeLanguage(option.value)
    void dispatch(getSitemaps())
  }

  return (
    <>
      <Select
        size={'middle'}
        showSearch
        labelInValue
        className="w-[8rem]"
        optionFilterProp="children"
        defaultValue={
          locales.find((item) => item.value === i18n.language) || locales[0]
        }
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={locales}
        onChange={handleChange}
      />
    </>
  )
}

export default SwitchLanguage
