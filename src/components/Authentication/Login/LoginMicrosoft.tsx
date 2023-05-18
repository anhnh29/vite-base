import { loginOthersMode } from 'interfaces/auth.interface'
import { FC } from 'react'
// import { useMsal } from '@azure/msal-react';
// import { loginRequest } from 'authConfig';
import useWindowSize from 'hooks/useWindowSize'
import { useAppDispatch } from 'stores'

const LoginMicrosoft: FC<{ mode: loginOthersMode }> = ({ mode }) => {
  // const { instance } = useMsal();
  const dispatch = useAppDispatch()
  const { windowWidth } = useWindowSize()
  const width = `${windowWidth > 500 ? 350 : Math.round(windowWidth * 0.8)}px`

  // const mfLogin: JSX.Element =
  // 	mode === 'logo' ? (
  // 		<MicrosoftSvg className="h-10 w-10" />
  // 	) : (
  // 		<div
  // 			className="m-auto box-border h-full rounded-lg border border-solid border-blue-110"
  // 			style={{ width }}
  // 		>
  // 			<MicrosoftFullSvg className="h-full w-full" />
  // 		</div>
  // 	);

  // https://learn.microsoft.com/vi-vn/azure/active-directory/develop/single-page-app-tutorial-02-prepare-spa?tabs=visual-studio-code
  const handleLogin = (): void => {
    // instance
    // 	.loginPopup(loginRequest)
    // 	.then((res) => {
    // 		console.log(444, res);
    // 		const { accessToken } = res;
    // 		const params: LoginSocialRequest = {
    // 			token: accessToken || '',
    // 			type: SOCIAL_LOGIN_TYPES.MICROSOFT,
    // 		};
    // 		void dispatch(loginSocial(params));
    // 	})
    // 	.catch((e) => {
    // 		console.log(e);
    // 	});
  }

  return (
    <>
      <div
        className="h-10 hover:cursor-pointer"
        onClick={() => {
          handleLogin()
        }}
      >
        {/* {mfLogin} */}
      </div>
    </>
  )
}

export default LoginMicrosoft
