import React from 'react'
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { login } from 'stores/authentication/auth.slices'
import { useAppDispatch } from 'stores'
import { emailValidations, pwdValidations } from 'utils/validations/rules'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getValidateMessage } from 'utils/validations/messages'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation('auth')

  const initialValues = {}

  const onFinish = (values: any): any => {
    const { email, password } = values
    void dispatch(login({ email, password }))
  }

  return (
    <Form
      className="pb-0 pt-[2rem]"
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
      validateMessages={getValidateMessage()}
    >
      <Form.Item name="email" label={t('email')} rules={emailValidations}>
        <Input
          size="large"
          prefix={<UserOutlined className="text-black-110" />}
          placeholder={`${t('email')}`}
        />
      </Form.Item>
      <Form.Item name="password" label={t('password')} rules={pwdValidations}>
        <Input.Password
          size="large"
          prefix={<LockOutlined className="text-black-110" />}
          type="password"
          placeholder={`${t('password')}`}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <div
        className="pb-4 text-center text-sm font-medium text-gray-60 hover:cursor-pointer hover:underline"
        onClick={() => {
          navigate('/forgot-pwd')
        }}
      >
        {t('forgot_pwd')}
      </div>
      <Button
        size="large"
        type="primary"
        htmlType="submit"
        className="w-full flex-row items-center justify-center text-sm font-bold"
      >
        {t('login')}
      </Button>
      <div
        id="register"
        className="py-4 text-center text-sm font-medium text-gray-60"
      >
        {t('dont_have_account')}
        <span
          className="pl-2 hover:cursor-pointer hover:underline"
          onClick={() => {
            navigate('/register')
          }}
        >
          {t('register_now')}
        </span>
      </div>
    </Form>
  )
}

export default Login
