import { Key, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Icon from '@ant-design/icons'
import { ReactComponent as HeartSvg } from 'assets/Heart.svg'
import SavvycomLogo from 'assets/SavvycomLogo.svg'
import SavvycomShortLogo from 'assets/SavvycomShortLogo.svg'
import { setCurrentSitemap, setShortcutSitemaps } from 'stores/common.slices'
import { RootState, useAppDispatch } from 'stores'
import { MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShortcutSitemap, Sitemap } from 'interfaces/sitemap.interface'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  }
}

function useSliderMenuHook(): any {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const shortcutSitemaps = useRef<ShortcutSitemap[]>([]) // without nested path
  const { sitemaps } = useSelector((state: RootState) => state.common)
  const [collapsed, setCollapsed] = useState(false)
  const [logo, setLogo] = useState(SavvycomLogo)

  const generateMenu = useCallback(
    (sitemaps: Sitemap[] | null, prefixPath?: string | null): any[] => {
      const menu: MenuItem[] = []

      sitemaps?.forEach((item: Sitemap) => {
        shortcutSitemaps.current = [
          ...shortcutSitemaps.current,
          {
            path: prefixPath ? prefixPath + (item.path as string) : item.path,
            key: item.key,
            sitemapCode: item.sitemapCode,
            permission: item.permission,
          },
        ]

        if (!item.children?.length) {
          menu.push(getItem(item.title, item.key))
        } else {
          menu.push(
            getItem(
              item.title,
              item.key,
              // item.icon,
              <Icon component={HeartSvg} />,
              generateMenu(item.children, item.path),
              item.type
            )
          )
        }
      })

      setMenu(menu)
      return menu
    },
    []
  )

  const generateSelectKeys = useCallback(
    (shortcutSitemaps: ShortcutSitemap[]): void => {
      shortcutSitemaps.forEach((item: ShortcutSitemap) => {
        if (item.path === location.pathname && item.key) {
          setSelectedKeys([item.key])
        }
      })
    },
    [location]
  )

  const generateOpenKeys = useCallback(
    (sitemaps: Sitemap[], openKeys: any[] = []): any => {
      for (const sitemap of sitemaps) {
        if (sitemap.path === location.pathname && sitemap.key) {
          return openKeys.concat(sitemap.key)
        }
        if (sitemap.children?.length) {
          const found = generateOpenKeys(
            sitemap.children,
            openKeys.concat(sitemap.key)
          )
          if (found) {
            return found
          }
        }
      }
      return undefined
    },
    [location]
  )

  const generateCurrentSitemap = useCallback(
    (keyPath: any[]) => {
      if (sitemaps && keyPath?.length) {
        const currentSitemap = sitemaps?.find((sitemap) =>
          keyPath.includes(sitemap.key)
        )

        currentSitemap && dispatch(setCurrentSitemap(currentSitemap))
      }
    },
    [dispatch, sitemaps]
  )

  const onClickMenu: MenuProps['onClick'] = (e) => {
    const { key } = e
    setOpenKeys(e.keyPath)
    setSelectedKeys(e.keyPath)
    generateCurrentSitemap(e.keyPath)

    const nextPath = shortcutSitemaps.current.find((item) => item.key === key)

    if (nextPath) {
      navigate(nextPath.path || '/', { replace: true })
      return true
    }
  }

  const onOpenChange = useCallback(
    (items: any[]): void => {
      const latestOpenKey = openKeys?.length
        ? items.find((key) => !openKeys.includes(key))
        : ''
      if (!sitemaps?.find((item) => item.path === latestOpenKey)) {
        setOpenKeys(items)
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : ['dashboad'])
      }
    },
    [openKeys, sitemaps]
  )

  useEffect(() => {
    if (menu?.length) {
      dispatch(setShortcutSitemaps(shortcutSitemaps.current))
    }
  }, [dispatch, menu])

  useEffect(() => {
    if (sitemaps) {
      generateMenu(sitemaps)
      generateSelectKeys(shortcutSitemaps.current)
      setOpenKeys(generateOpenKeys(sitemaps))
      generateCurrentSitemap(generateOpenKeys(sitemaps))
    }

    setLogo(collapsed ? SavvycomShortLogo : SavvycomLogo)
  }, [
    generateCurrentSitemap,
    generateMenu,
    generateOpenKeys,
    generateSelectKeys,
    sitemaps,
    collapsed,
  ])

  return {
    generateMenu,
    generateSelectKeys,
    onClickMenu,
    onOpenChange,
    setCollapsed,
    menu,
    selectedKeys,
    openKeys,
    collapsed,
    logo,
  }
}

export default useSliderMenuHook
