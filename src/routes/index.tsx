import NotFound from 'components/Common/NotFound'
import MainLayout from 'layouts/MainLayout'
import LoginPage from 'pages/authentication/LoginPage'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import UserRouter from './user'

// const mainLoader = (): any => {
// 	const user = StorageService.getItem('user');
// 	return user ? true : redirect('/login');
// };

// const authLoader = (loader: any): any => {
// 	const user = StorageService.getItem('user');
// 	return user ? redirect('/dashboard') : true;
// };

const router = createBrowserRouter([
  // {
  // 	path: '/',
  // 	element: <AuthLayout />,
  // 	loader: authLoader,
  // 	children: [...AuthRouter],
  // },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    // loader: mainLoader,
    children: [...UserRouter],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
