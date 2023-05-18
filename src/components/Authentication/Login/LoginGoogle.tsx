/* eslint-disable tailwindcss/no-custom-classname */
import { FC } from 'react'
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SOCIAL_LOGIN_TYPES } from 'enums/auth.enum'
import { LoginSocialRequest, loginOthersMode } from 'interfaces/auth.interface'
import { useAppDispatch } from 'stores'
import { loginSocial } from 'stores/authentication/auth.slices'
import useWindowSize from 'hooks/useWindowSize'

const LoginGoogle: FC<{ mode: loginOthersMode }> = ({ mode }) => {
  // const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const dispatch = useAppDispatch()
  const { windowWidth } = useWindowSize()

  ;(window as any).onLoginGoogle = (response: any): any => {
    const params: LoginSocialRequest = {
      token: response.credential || '',
      type: SOCIAL_LOGIN_TYPES.GOOGLE,
    }
    void dispatch(loginSocial(params))
  }

  const googleLogin =
    mode === 'logo' ? (
      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="square"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
      ></div>
    ) : (
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_width"
        data-size="large"
        data-width={windowWidth > 500 ? 350 : Math.round(windowWidth * 0.8)}
        data-logo_alignment="left"
      ></div>
    )

  return (
    <>
      {/* <HelmetProvider>
				<Helmet>
					<meta
						name="google-signin-client_id"
						content={googleClientID}
					/>
					<script
						src="https://accounts.google.com/gsi/client"
						async
						defer
					></script>
				</Helmet>
			</HelmetProvider>
			<div>
				<div
					id="g_id_onload"
					data-client_id={googleClientID}
					data-context="signin"
					data-ux_mode="popup"
					data-callback="onLoginGoogle"
					data-auto_prompt="false"
				></div>
				{googleLogin}
			</div> */}
    </>
  )
}

export default LoginGoogle
