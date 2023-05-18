export interface Sitemap {
  key: string
  path: string | null
  permission: {
    canCreate: boolean
    canRead: boolean
    canUpdate: boolean
    canDelete: boolean
  }
  icon?: string | null
  children?: Sitemap[]
  sitemapCode: string
  title?: string
  type?: 'group'
}

export interface ShortcutSitemap {
  path: string | null
  key: string | null
  sitemapCode: string | null
  permission?: {
    canCreate: boolean
    canRead: boolean
    canUpdate: boolean
    canDelete: boolean
  } | null
}
