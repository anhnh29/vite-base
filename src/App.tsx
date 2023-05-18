/* eslint-disable tailwindcss/no-custom-classname */
import { ReactElement } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AuthProvider } from 'providers/auth/auth.provider'

function App(): ReactElement {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
