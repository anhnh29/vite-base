import { getValidateMessage } from './messages'
import { Rule, RuleObject } from 'antd/es/form'

export const passwordMatchValidator = (form: any): RuleObject => {
  const message = getValidateMessage().passwordMatchValidator
  return {
    message,
    validator: async (_, value) => {
      !value || form.getFieldValue('password') === value
        ? await Promise.resolve()
        : await Promise.reject(new Error(message))
    },
  }
}

export const passwordSyntaxValidator = (): RuleObject => {
  const message = getValidateMessage().passwordSyntaxValidator
  return {
    validator: async (_, value) => {
      ;/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).+$/.test(value)
        ? await Promise.resolve()
        : await Promise.reject(new Error(message))
    },
  }
}

export const emailValidations: Rule[] = [{ type: 'email' }, { required: true }]

export const pwdValidations: Rule[] = [
  { required: true },
  { min: 8 },
  { max: 32 },
  passwordSyntaxValidator,
]
