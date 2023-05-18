import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Dashboard: FC = () => {
  const { t } = useTranslation('common')
  return <>{t('dashboard')}</>
}

export default Dashboard
