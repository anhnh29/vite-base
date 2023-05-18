import { theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { FC } from 'react'
import BreadcrumbCustom from './Breadcrumb'
import SwitchLanguage from './SwitchLanguage'
import UserInfo from './UserInfo'

const HeaderComponent: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Header
      className="sticky top-0 z-10 flex w-full flex-row items-center gap-4 border-0 border-b border-solid border-b-gray-70 px-5 py-4"
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <BreadcrumbCustom />
      <div className="flex flex-auto items-center justify-end gap-4">
        <SwitchLanguage />
        <UserInfo />
      </div>
    </Header>
  )
}

export default HeaderComponent
