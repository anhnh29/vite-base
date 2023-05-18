import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommonState {
  pageLoading: boolean
}

const initialState: CommonState = {
  pageLoading: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPageLoading(state, action: PayloadAction<boolean>) {
      state.pageLoading = action.payload
    },
  },
})

export const { setPageLoading } = commonSlice.actions
export default commonSlice.reducer
