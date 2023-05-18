import { Button, Form, Input } from 'antd'
import { FC } from 'react'
import { emailValidations } from 'utils/validations/rules'
import { useAppDispatch } from 'stores'
import { forgotPwd } from 'stores/authentication/auth.slices'
import { useTranslation } from 'react-i18next'
import { getValidateMessage } from 'utils/validations/messages'

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('auth')

  const initialValues = {
    email: '',
  }

  const onFinish = (values: any): any => {
    const { email } = values
    void dispatch(forgotPwd({ email }))
  }

  return (
    <>
      <div className="m-0 text-[1.625rem] font-bold leading-8 text-black-60">
        {t('forgot_pwd')}
      </div>
      <div className="py-6 text-sm font-normal text-black-60">
        {t('fogot_pwd_note')}
      </div>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
        validateMessages={getValidateMessage()}
      >
        <Form.Item name="email" label={t('email')} rules={emailValidations}>
          <Input
            size="large"
            placeholder={`${t('enter_your_email')}`}
            className="h-df"
          ></Input>
        </Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="mt-2 w-full flex-row items-center justify-center text-sm font-bold"
        >
          {t('send')}
        </Button>
      </Form>
    </>
  )
}

export default ForgotPassword
