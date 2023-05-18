import Icon from '@ant-design/icons/lib/components/Icon'
import { Divider, Dropdown, Image, MenuProps, Space, theme } from 'antd'
import { ReactComponent as SavvycomShortLogo } from 'assets/SavvycomShortLogo.svg'
import { ReactComponent as DownSvg } from 'assets/down.svg'
import { ReactComponent as LockOpenSvg } from 'assets/lock-open.svg'
import { useAppContext } from 'providers/auth/auth.provider'
import { FC, ReactElement, cloneElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'stores'

const UserInfo: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { useToken } = theme
  const { token } = useToken()
  const { logout } = useAppContext()
  const { t } = useTranslation('auth')

  const [openDropdown, setOpenDropdown] = useState(false)

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  }

  const menuStyle = {
    boxShadow: 'none',
  }

  const items: MenuProps['items'] = [
    // {
    // 	key: '1',
    // 	label: (
    // 		<div
    // 			className="flex flex-nowrap gap-2 text-black-60"
    // 			onClick={() => {
    // 				navigate('/');
    // 			}}
    // 		>
    // 			<UserSvg className="[&>path]:fill-gray-60" />
    // 			{t('update_profile')}
    // 		</div>
    // 	),
    // },
    // {
    // 	key: '2',
    // 	label: (
    // 		<div
    // 			className="flex flex-nowrap gap-2"
    // 			onClick={() => {
    // 				navigate('/');
    // 			}}
    // 		>
    // 			<PasswordSvg className="[&>path]:fill-gray-60" />
    // 			{t('change_pwd')}
    // 		</div>
    // 	),
    // },
    {
      key: '3',
      label: (
        <div
          className="flex flex-nowrap gap-2"
          onClick={() => {
            logout()
          }}
        >
          <LockOpenSvg className="[&>path]:fill-gray-60" />
          {t('logout')}
        </div>
      ),
    },
  ]
  return (
    <>
      <div className="flex h-12 gap-2 rounded-lg p-2 hover:cursor-pointer hover:bg-white-90">
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          overlayClassName="pt-2"
          onOpenChange={(open) => {
            setOpenDropdown(open)
          }}
          dropdownRender={(menu) => (
            <div style={contentStyle} className="text-black-60">
              {user && (
                <Space className="flex flex-col flex-nowrap items-start gap-1 px-5 py-2">
                  <div className="font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                  {user.username && (
                    <div className="text-xs">@{user.username}</div>
                  )}
                  <div className="pt-1">{user.role}</div>
                </Space>
              )}
              <Divider className="m-0" />
              {cloneElement(menu as ReactElement, {
                style: menuStyle,
              })}
            </div>
          )}
        >
          <div className="flex flex-nowrap items-center gap-2  hover:cursor-pointer">
            {user?.avatar ? (
              <>
                <Image
                  className="h-10 w-10 rounded-[50%] border border-solid border-gray-60 object-cover"
                  src={user.avatar}
                ></Image>
              </>
            ) : (
              <SavvycomShortLogo className="h-10 w-10 rounded-[50%]" />
            )}
            <Icon
              component={DownSvg}
              className={
                'h-3 w-3 ' +
                (openDropdown
                  ? 'rotate-180 duration-500 ease-in-out'
                  : 'rotate-0  duration-500 ease-in-out')
              }
            />
          </div>
        </Dropdown>
      </div>
    </>
  )
}
export default UserInfo
