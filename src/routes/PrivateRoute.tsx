import {
  AppContextInterface,
  AuthConsumer,
  useAppContext,
} from 'providers/auth/auth.provider'
// import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: any): JSX.Element {
  const { signinRedirect } = useAppContext()
  return (
    <AuthConsumer>
      {({ isAuthenticated }: AppContextInterface) => {
        // return children;
        if (!!children && isAuthenticated()) {
          return children
        } else {
          return signinRedirect()
          // return <Navigate to="/register-company" />;
        }
      }}
    </AuthConsumer>
  )
}
