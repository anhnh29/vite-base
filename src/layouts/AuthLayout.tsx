import { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from 'assets/logo.svg'

const AuthLayout: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="lg:grid-cols-12 grid h-full w-full grid-cols-1">
      <div className="md:col-span-5 col-span-1 flex h-full w-full flex-col bg-white-50">
        <div className="md:block md:text-left m-10 hidden text-center">
          <Logo
            className="md:w-auto h-full w-full hover:cursor-pointer"
            onClick={() => {
              navigate('/')
            }}
          />
        </div>
        <div className="sm:w-[350px] m-auto w-[80%] pb-10">
          <div className="sm:mt-0 md:hidden mx-auto my-8 text-center">
            <Logo
              className="h-auto w-[300px] max-w-full hover:cursor-pointer"
              onClick={() => {
                navigate('/')
              }}
            />
          </div>
          <Outlet />
        </div>
      </div>

      <div className="lg:block col-span-7 m-10 hidden rounded-lg bg-white-70"></div>
    </div>
  )
}

export default AuthLayout
