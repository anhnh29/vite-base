import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const labels = {
  success: 'Success',
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
}

const showToastMsg = (
  description: string,
  type: NotificationType = 'error',
  message?: string
): void => {
  notification.destroy()
  notification[type]({
    message: message || labels[type],
    description,
    key: Date.now(),
  })
}

const ToastService = {
  showToastMsg,
}

export default ToastService
