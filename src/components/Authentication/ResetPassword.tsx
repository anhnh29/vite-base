import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'stores'
import { resetPwd } from 'stores/authentication/auth.slices'
import { passwordMatchValidator, pwdValidations } from 'utils/validations/rules'

const ResetPassword: FC = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const initialValues = {
    password: '',
    newPassword: '',
  }

  const onFinish = (values: any): any => {
    const { password } = values
    void dispatch(resetPwd({ token: `${params.token}`, password }))
  }

  return (
    <>
      <div className="m-0 pb-6 text-2xl font-bold leading-8 text-black-60">
        Reset password
      </div>
      <Form
        className="pb-0"
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label="New password"
          className="text-sm font-medium text-black-60"
          rules={pwdValidations}
        >
          <Input.Password
            size="large"
            className="h-df"
            type="password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          ></Input.Password>
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Re-enter new password"
          className="text-sm font-medium text-black-60"
          rules={[...pwdValidations, passwordMatchValidator]}
        >
          <Input.Password
            size="large"
            className="h-df"
            type="password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          ></Input.Password>
        </Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="h-df w-full flex-row items-center justify-center text-sm font-bold"
        >
          Reset password
        </Button>
      </Form>
    </>
  )
}
export default ResetPassword
