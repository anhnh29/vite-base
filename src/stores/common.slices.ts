import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortcutSitemap, Sitemap } from 'interfaces/sitemap.interface'
import StorageService from 'services/storage.service'

interface CommonState {
  sitemaps: Sitemap[] | null
  shortcutSitemaps: ShortcutSitemap[] | null
  currentSitemap: Sitemap | null
}

const initialState: CommonState = {
  sitemaps: null,
  shortcutSitemaps: null,
  currentSitemap: null,
}

export const getSitemaps = createAsyncThunk(
  'common/getSitemaps',
  async (_, thunkAPI) => {
    try {
      // const sitemaps = await PermissionService.getSitemaps();
      const fakeData: Sitemap[] = [
        {
          key: 'dashboard',
          sitemapCode: 'dashboard',
          path: '/dashboard',
          title: 'Dashboard',
          icon: '<UserOutlined />',
          children: [],
          permission: {
            canCreate: true,
            canRead: true,
            canUpdate: true,
            canDelete: true,
          },
        },
        {
          key: 'profile',
          sitemapCode: 'profile',
          path: '/user-profile',
          title: 'User profile',
          icon: '<DashboardOutlined />',
          children: [],
          permission: {
            canCreate: true,
            canRead: true,
            canUpdate: true,
            canDelete: true,
          },
        },
        {
          key: 'setting',
          sitemapCode: 'setting',
          path: null,
          title: 'Setting',
          icon: '<UserOutlined />',
          children: [
            {
              key: 'setting-provider',
              sitemapCode: 'setting-provider',
              path: '/setting-provider',
              title: 'Setup Provider',
              icon: null,
              children: [],
              permission: {
                canCreate: false,
                canRead: true,
                canUpdate: false,
                canDelete: false,
              },
            },
            {
              key: 'setting-template',
              sitemapCode: 'setting-template',
              path: '/setting-template',
              title: 'Setup Template',
              icon: null,
              children: [],
              permission: {
                canCreate: false,
                canRead: true,
                canUpdate: false,
                canDelete: false,
              },
            },
            {
              key: 'setting-language',
              sitemapCode: 'setting-language',
              path: '/setting-language',
              title: 'Setup language',
              icon: null,
              children: [],
              permission: {
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
              },
            },
          ],
          permission: {
            canCreate: false,
            canRead: true,
            canUpdate: false,
            canDelete: false,
          },
        },
        // {
        // 	key: 'systems-management',
        // 	sitemapCode: 'systems-management',
        // 	path: '/systems',
        // 	title: 'Systems',
        // 	icon: '<UserOutlined />',
        // 	children: [
        // 		{
        // 			key: 'systems-management-rules',
        // 			sitemapCode: 'systems-management-rules',
        // 			path: '/rules-engine',
        // 			title: 'Rule Engine Settings',
        // 			icon: null,
        // 			children: [],
        // 			permission: {
        // 				canCreate: false,
        // 				canRead: true,
        // 				canUpdate: false,
        // 				canDelete: false,
        // 			},
        // 		},
        // 		{
        // 			key: 'systems-management-roles',
        // 			sitemapCode: 'systems-management-roles',
        // 			path: '/roles',
        // 			title: 'Roles',
        // 			icon: null,
        // 			children: [],
        // 			permission: {
        // 				canCreate: false,
        // 				canRead: true,
        // 				canUpdate: false,
        // 				canDelete: false,
        // 			},
        // 		},
        // 		{
        // 			key: 'systems-management-sitemaps',
        // 			sitemapCode: 'systems-management-sitemaps',
        // 			path: '/sitemaps',
        // 			title: 'Sitemaps',
        // 			icon: null,
        // 			children: [],
        // 			permission: {
        // 				canCreate: false,
        // 				canRead: true,
        // 				canUpdate: false,
        // 				canDelete: false,
        // 			},
        // 		},
        // 	],
        // 	permission: {
        // 		canCreate: false,
        // 		canRead: true,
        // 		canUpdate: false,
        // 		canDelete: false,
        // 	},
        // },
      ]

      return fakeData
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setShortcutSitemaps(state, action: PayloadAction<ShortcutSitemap[]>) {
      state.shortcutSitemaps = action.payload
      StorageService.setItem('shortcutSitemaps', action.payload)
    },
    setCurrentSitemap(state, action: PayloadAction<Sitemap>) {
      state.currentSitemap = action.payload
      StorageService.setItem('currentSitemap', action.payload)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSitemaps.pending, (state) => {
        state.sitemaps = []
      })
      .addCase(
        getSitemaps.fulfilled,
        (state, action: PayloadAction<Sitemap[]>) => {
          state.sitemaps = action.payload
        }
      )
      .addCase(getSitemaps.rejected, (state) => {
        state.sitemaps = []
      })
  },
})

export const { setShortcutSitemaps, setCurrentSitemap } = commonSlice.actions
export default commonSlice.reducer
