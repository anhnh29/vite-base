import Dashboard from 'pages/dashboard/Dashboard'
import SettingTemplate from 'pages/setting-template/SettingTemplate'
import { RouteObject } from 'react-router-dom'

const UserRouter: RouteObject[] = [
  {
    path: 'setting-template',
    children: [
      {
        path: '',
        element: <SettingTemplate />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
]

export default UserRouter
