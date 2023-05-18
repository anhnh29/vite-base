import { Modal, ModalProps } from 'antd'
import { useTranslation } from 'react-i18next'

export type IModalProps = ModalProps

export default function ModalC({
  open,
  onOk,
  onCancel,
  children,
  width,
  okText,
  okButtonProps,
  title,
  ...others
}: IModalProps): JSX.Element {
  const { t } = useTranslation('common')
  return (
    <Modal
      centered
      width={width}
      title={title || t('filter.add_filter')}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      okButtonProps={okButtonProps}
      {...others}
    >
      {children}
    </Modal>
  )
}
