import { FC } from 'react'
import { Breadcrumb } from 'antd'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from 'stores'

const BreadcrumbCustom: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentSitemap } = useSelector((state: RootState) => state.common)

  const navigateByPath = (path: string | null): void => {
    path && navigate(path)
  }

  return currentSitemap ? (
    <Breadcrumb
      separator=">"
      className="flex h-full flex-auto items-center overflow-auto"
    >
      <Breadcrumb.Item className="text-gray-60">
        <span
          onClick={() => {
            navigateByPath(currentSitemap.path)
          }}
        >
          {currentSitemap.title}
        </span>
      </Breadcrumb.Item>

      {currentSitemap.children?.map(
        (item) =>
          item.path &&
          location.pathname.includes(item.path) && (
            <Breadcrumb.Item
              key={item.key}
              className="text-black-60 hover:cursor-pointer"
            >
              <span
                onClick={() => {
                  navigateByPath(item.path)
                }}
              >
                {item.title}
              </span>
            </Breadcrumb.Item>
          )
      )}
    </Breadcrumb>
  ) : (
    <></>
  )
}

export default BreadcrumbCustom
