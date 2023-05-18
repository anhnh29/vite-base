import React from 'react'
import { ConfigProvider, ThemeConfig } from 'antd'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './stores'
import './styles/index.scss'
import './i18n/config'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#3c6d73',
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ConfigProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
  // </React.StrictMode>
)
