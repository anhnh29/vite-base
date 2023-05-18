import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authentication/auth.slices'
import commonReducer from './common.slices'
import layoutReducer from './layout.slides'

const reducer = {
  auth: authReducer,
  common: commonReducer,
  layout: layoutReducer,
}

const store = configureStore({
  reducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export default store
