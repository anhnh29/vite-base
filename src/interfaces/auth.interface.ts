import { SOCIAL_LOGIN_TYPES, VERIFY_EMAIL_TYPES } from 'enums/auth.enum'
import { User } from './user.interface'

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface LoginSocialRequest {
  token: string
  type: SOCIAL_LOGIN_TYPES
  firstName?: string
  lastName?: string
}

export interface SendOTPRequest {
  email: string
  type: VERIFY_EMAIL_TYPES
}

export interface VerifyTokenRequest {
  token: string
}

export interface ForgotPwdRequest {
  email: string
}

export interface ResetPwdRequest {
  token: string
  password: string
}

export type loginOthersMode = 'logo' | 'full'
