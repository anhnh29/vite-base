/* eslint-disable tailwindcss/no-custom-classname */
import { FC } from 'react'
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SOCIAL_LOGIN_TYPES } from 'enums/auth.enum'
import { LoginSocialRequest, loginOthersMode } from 'interfaces/auth.interface'
import { useAppDispatch } from 'stores'
import { loginSocial } from 'stores/authentication/auth.slices'
import useWindowSize from 'hooks/useWindowSize'
import FacebookSvg from 'assets/fb.svg'

// References: https://developers.facebook.com/tools/explorer

const LoginFacebook: FC<{ mode: loginOthersMode }> = ({ mode }) => {
  // const facebookAppID = process.env.REACT_APP_FACEBOOK_APP_ID;
  const dispatch = useAppDispatch()
  const { windowWidth } = useWindowSize()

  ;(window as any).onLoginFb = (response: any): any => {
    const { authResponse, status } = response
    if (status === 'connected') {
      const params: LoginSocialRequest = {
        token: authResponse.accessToken || '',
        type: SOCIAL_LOGIN_TYPES.FACEBOOK,
      }
      void dispatch(loginSocial(params))
    }
  }

  const onLoginFb = (): void => {
    ;(window as any).FB.login(function (response: any) {
      const { authResponse, status } = response
      if (status === 'connected') {
        const params: LoginSocialRequest = {
          token: authResponse.accessToken || '',
          type: SOCIAL_LOGIN_TYPES.FACEBOOK,
        }
        void dispatch(loginSocial(params))
      }
    })
  }

  // const fbLogin: JSX.Element =
  // 	mode === 'logo' ? (
  // 		<div
  // 			className="fb-login-button h-11 cursor-pointer"
  // 			onClick={() => {
  // 				onLoginFb();
  // 			}}
  // 		>
  // 			<FacebookSvg className="h-11 w-10 fill-blue-120" />
  // 		</div>
  // 	) : (
  // 		<div
  // 			className="fb-login-button"
  // 			data-width={
  // 				windowWidth > 500 ? 350 : Math.round(windowWidth * 0.8)
  // 			}
  // 			data-size="large"
  // 			data-button-type=""
  // 			data-layout=""
  // 			data-use-continue-as="true"
  // 			data-auto-logout-link="false"
  // 		></div>
  // 	);

  return (
    <>
      {/* <HelmetProvider>
				<Helmet>
					<script
						async
						defer
						crossOrigin="anonymous"
						src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v16.0&appId=${facebookAppID}&autoLogAppEvents=1`}
						nonce="GAfytEL4"
					></script>
				</Helmet>
				{fbLogin}
			</HelmetProvider> */}
    </>
  )
}

export default LoginFacebook
