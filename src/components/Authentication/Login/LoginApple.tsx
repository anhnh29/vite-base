import { FC, useCallback, useEffect } from 'react'
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SOCIAL_LOGIN_TYPES } from 'enums/auth.enum'
import { LoginSocialRequest, loginOthersMode } from 'interfaces/auth.interface'
import { useAppDispatch } from 'stores'
import { loginSocial } from 'stores/authentication/auth.slices'
import useWindowSize from 'hooks/useWindowSize'

const LoginApple: FC<{ mode: loginOthersMode }> = ({ mode }) => {
  // const appleClientID = process.env.REACT_APP_APPLE_CLIENT_ID;

  const dispatch = useAppDispatch()
  const { windowWidth } = useWindowSize()

  const onLoginAppleSuccess = useCallback(
    (event: any): void => {
      const { authorization } = event.detail
      const params: LoginSocialRequest = {
        token: authorization.id_token || '',
        type: SOCIAL_LOGIN_TYPES.APPLE,
      }

      void dispatch(loginSocial(params))
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', onLoginAppleSuccess)

    return () => {
      window.removeEventListener('AppleIDSignInOnSuccess', onLoginAppleSuccess)
    }
  }, [onLoginAppleSuccess])

  // https://appleid.apple.com/signinwithapple/button
  // https://developer.apple.com/documentation/sign_in_with_apple/displaying_sign_in_with_apple_buttons_on_the_web
  const appleLogin: JSX.Element = (
    <div
      id="appleid-signin"
      className="h-10 hover:cursor-pointer"
      data-color="white"
      data-border="true"
      data-type="sign-in"
      data-mode={mode === 'logo' ? 'logo-only' : 'center-align'}
      data-width={windowWidth > 500 ? 350 : Math.round(windowWidth * 0.8)}
    ></div>
  )

  return (
    <>
      {/* <HelmetProvider>
				<Helmet>
					<meta
						name="appleid-signin-client-id"
						content={appleClientID}
					/>
					<meta name="appleid-signin-use-popup" content="true" />
					<meta name="appleid-signin-scope" content="email name" />
					<meta
						name="appleid-signin-redirect-uri"
						content={process.env.REACT_APP_APPLE_REDIRECT_URI}
					/>
					<script
						type="text/javascript"
						src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
					></script>
				</Helmet>
			</HelmetProvider> */}
      {appleLogin}
    </>
  )
}

export default LoginApple
