import { Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { FC } from 'react'
import './SliderMenu.scss'
import useSliderMenuHook from 'hooks/useSliderMenuHook'
import { useNavigate } from 'react-router-dom'

const SliderMenu: FC = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const {
    onClickMenu,
    onOpenChange,
    setCollapsed,
    selectedKeys,
    openKeys,
    menu,
    collapsed,
    logo,
  } = useSliderMenuHook()

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      style={{ background: colorBgContainer }}
      className="sticky inset-y-0 left-0 h-screen overflow-auto border-0 border-r border-solid border-r-gray-70"
      onCollapse={(value) => {
        setCollapsed(value)
      }}
    >
      <div
        className="sticky top-0 z-10 h-24 bg-white-50 p-3 text-center hover:cursor-pointer"
        onClick={() => {
          navigate('/')
        }}
      >
        <img
          src={logo}
          className={collapsed ? 'h-full w-10' : 'h-full w-full'}
          alt=""
        />
      </div>
      <div>
        <Menu
          mode="inline"
          onClick={onClickMenu}
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menu}
          className="h-auto overflow-auto border-none"
        />
      </div>
    </Sider>
  )
}

export default SliderMenu
