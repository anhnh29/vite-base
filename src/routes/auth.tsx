import LoginPage from 'pages/authentication/LoginPage'
import { RouteObject } from 'react-router-dom'

const AuthRouter: RouteObject[] = [
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    index: true,
    Component: LoginPage,
  },
]

export default AuthRouter
