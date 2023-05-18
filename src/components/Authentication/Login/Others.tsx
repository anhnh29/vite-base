import { FC, useState } from 'react'
import LoginApple from './LoginApple'
import LoginFacebook from './LoginFacebook'
import LoginGoogle from './LoginGoogle'
import { useTranslation } from 'react-i18next'
import { loginOthersMode } from 'interfaces/auth.interface'
import LoginMicrosoft from './LoginMicrosoft'

const OthersLogin: FC = () => {
  const { t } = useTranslation('auth')
  const [mode] = useState<loginOthersMode>('logo')

  return (
    <>
      <div>
        <div className="mb-6 flex items-center text-xs opacity-60 before:mx-[5px] before:my-0 before:w-1/2 before:border before:border-solid before:border-black-110 before:content-[''] after:mx-[5px] after:my-0 after:w-1/2 after:border after:border-solid after:border-black-110 after:content-['']">
          <span>{t('or')}</span>
        </div>
        <div
          className={`sm:pb-0 flex items-center justify-center gap-4 pb-8 pt-0 ${
            mode === 'logo' ? 'items-center' : 'flex-col'
          }`}
        >
          <LoginGoogle mode={mode} />
          <LoginFacebook mode={mode} />
          <LoginApple mode={mode} />
          <LoginMicrosoft mode={mode} />
        </div>
      </div>
    </>
  )
}

export default OthersLogin
