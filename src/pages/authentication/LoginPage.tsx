import Loading from 'components/loading'
import { AppContextInterface, AuthConsumer } from 'providers/auth/auth.provider'
import { useEffect } from 'react'

export default function LoginPage(): JSX.Element {
  useEffect(() => {
    document.title = 'Waiting...'
  }, [])
  return (
    <AuthConsumer>
      {({ signinRedirectCallback }: AppContextInterface) => {
        signinRedirectCallback()
        return <Loading text="Waiting for login..." />
      }}
    </AuthConsumer>
  )
}
