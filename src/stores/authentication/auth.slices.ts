import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  LoginRequest,
  LoginSocialRequest,
  RegisterRequest,
  SendOTPRequest,
  ForgotPwdRequest,
  ResetPwdRequest,
} from 'interfaces/auth.interface'
import router from 'routes'
import AuthService from 'services/auth.service'
import StorageService from 'services/storage.service'
import ToastService from 'services/toast.service'
import { User } from 'interfaces/user.interface'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token?: string
  OTP?: string | null
}

const user = StorageService.getItem('user')
const initialState: AuthState = {
  isLoggedIn: !!user,
  user: user || null,
  token: '',
  OTP: null,
}

const register = createAsyncThunk(
  'auth/register',
  async (params: RegisterRequest, thunkAPI) => {
    try {
      await AuthService.register(params)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (params: LoginRequest, thunkAPI) => {
    try {
      const { user, token } = await AuthService.login(params)
      StorageService.setItem('token', token)
      StorageService.setItem('user', user)
      void router.navigate('/', { replace: true })
      return { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const loginSocial = createAsyncThunk(
  'auth/loginSocial',
  async (params: LoginSocialRequest, thunkAPI) => {
    try {
      const { user, token } = await AuthService.loginSocial(params)
      StorageService.setItem('token', token)
      StorageService.setItem('user', user)
      void router.navigate('/', { replace: true })
      return { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', () => {
  AuthService.logout()
  StorageService.clear()
  void router.navigate('/')
})

export const forgotPwd = createAsyncThunk(
  'auth/forgotPwd',
  async (params: ForgotPwdRequest, thunkAPI) => {
    try {
      await AuthService.forgotPwd(params)
      ToastService.showToastMsg('Please check email', 'success')
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const resetPwd = createAsyncThunk(
  'auth/resetPwd',
  async (params: ResetPwdRequest, thunkAPI) => {
    try {
      await AuthService.resetPwd(params)
      ToastService.showToastMsg('Please check email', 'success')
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (params: SendOTPRequest, thunkAPI) => {
    try {
      await AuthService.sendOTP(params)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoggedIn = false
        state.user = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false
        state.user = null
      })

    // Login social
    builder
      .addCase(loginSocial.pending, (state) => {
        state.isLoggedIn = false
        state.user = null
      })
      .addCase(loginSocial.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginSocial.rejected, (state) => {
        state.isLoggedIn = false
        state.user = null
      })

    // Register
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false
      })

    // Forgot Password
    builder
      .addCase(forgotPwd.fulfilled, (state, action) => {
        state.isLoggedIn = false
      })
      .addCase(forgotPwd.rejected, (state, action) => {
        state.isLoggedIn = false
        state.user = null
      })

    // Reset Password
    builder
      .addCase(resetPwd.fulfilled, (state, action) => {
        state.isLoggedIn = false
      })
      .addCase(resetPwd.rejected, (state, action) => {
        state.isLoggedIn = false
      })

    // Send OTP
    builder
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoggedIn = false
        state.user = null
        state.OTP = action.payload
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoggedIn = false
        state.user = null
        state.OTP = null
      })

    // Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.user = null
    })
  },
})

export default authSlice.reducer
