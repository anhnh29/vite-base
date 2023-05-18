import AuthService from 'services/id4Auth.service'
import { createContext, ReactNode, useContext } from 'react'

export interface AppContextInterface {
  signinRedirectCallback: () => void
  logout: () => void
  signoutRedirectCallback: () => void
  isAuthenticated: () => {}
  signinRedirect: () => void
  signinSilentCallback: () => void
  createSigninRequest: () => void
}

const AuthContext = createContext<AppContextInterface>({
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
})

export const AuthConsumer = AuthContext.Consumer

const useAppContext = (): AppContextInterface => useContext(AuthContext)

export { AuthContext, useAppContext }

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const authService = new AuthService()
  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  )
}
