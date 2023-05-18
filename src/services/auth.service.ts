import { API_AUTH_URL } from 'config'
import axiosInstance from './api.service'
import {
  ForgotPwdRequest,
  LoginRequest,
  LoginResponse,
  LoginSocialRequest,
  RegisterRequest,
  ResetPwdRequest,
  SendOTPRequest,
  VerifyTokenRequest,
} from 'interfaces/auth.interface'

const API_URL = `${API_AUTH_URL}/auth`

const register = async (params: RegisterRequest): Promise<any> => {
  return await axiosInstance.post(`${API_URL}/register`, params)
}

const login = async (params: LoginRequest): Promise<LoginResponse> => {
  return await axiosInstance.post(`${API_URL}/login`, params)
}

const loginSocial = async (params: LoginSocialRequest): Promise<any> => {
  return await axiosInstance.post(`${API_URL}/login-social`, params)
}

const verifyToken = async (params: VerifyTokenRequest): Promise<any> => {
  return await axiosInstance.get(`${API_URL}/verfiy/${params.token as string}`)
}

const sendOTP = async (params: SendOTPRequest): Promise<any> => {
  return await axiosInstance.post(`${API_URL}/resend`, params)
}

const forgotPwd = async (params: ForgotPwdRequest): Promise<any> => {
  return await axiosInstance.post(`${API_URL}/forgot-password`, params)
}

const resetPwd = async (params: ResetPwdRequest): Promise<any> => {
  return await axiosInstance.post(`${API_URL}/reset-password`, params)
}

const logout = (): void => {}

const AuthService = {
  register,
  login,
  loginSocial,
  verifyToken,
  sendOTP,
  forgotPwd,
  resetPwd,
  logout,
}

export default AuthService
