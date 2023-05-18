import { Layout, Spin } from 'antd'
import HeaderComponent from 'components/Common/Header'
import Rotate from 'components/Common/Rotation'
import SliderMenu from 'components/Common/SliderMenu/SliderMenu'
import useOrientation from 'hooks/useOrientation'
import { Sitemap } from 'interfaces/sitemap.interface'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PermissionService, {
  CheckPermissionRequest,
} from 'services/permission.service'
import StorageService from 'services/storage.service'
import { RootState, useAppDispatch } from 'stores'
import { getSitemaps } from 'stores/common.slices'

const { Content } = Layout
const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const orientation = useOrientation()
  const location = useLocation()
  const navigate = useNavigate()
  const { pageLoading } = useSelector((state: RootState) => state.layout)
  useEffect(() => {
    void dispatch(getSitemaps())
  }, [dispatch])

  useEffect(() => {
    const checkPermisson = async (): Promise<any> => {
      const sitemaps = StorageService.getItem('sitemaps')
      const sitemap: Sitemap | null = sitemaps?.length
        ? sitemaps.find((item: Sitemap) => item.path === location.pathname)
        : null
      const request: CheckPermissionRequest = {
        path: location.pathname,
        sitemapCode: sitemap?.sitemapCode || '',
      }
      const isAllow = await PermissionService.checkPermission(request)

      if (!isAllow) {
        navigate('/')
        return true
      }
    }

    void checkPermisson()
  }, [location.pathname, navigate])

  return orientation === 'landscape-primary' ? (
    <Layout className="min-h-[100vh]">
      <SliderMenu />
      <Layout>
        <HeaderComponent />
        <Content>
          <div className="relative min-h-full bg-[#f0f2f5] p-4">
            {pageLoading && (
              <Spin className="absolute inset-0 z-50 flex cursor-wait items-center justify-center bg-white-50/50" />
            )}
            <Outlet />
          </div>
        </Content>
        {/* <Footer className="px-[50px] pb-[15px] pt-4 text-center">
					GYM ©2023 Created by SAVVYCOM
				</Footer> */}
      </Layout>
    </Layout>
  ) : (
    <Rotate />
  )
}

export default MainLayout
