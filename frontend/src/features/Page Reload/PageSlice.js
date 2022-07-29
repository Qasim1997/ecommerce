import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pagereload: null,
}

export const PageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageInfo:(state , action)=> {
      state.search = action.payload.search

  },
  },
})

export const { setPageInfo  } = PageSlice.actions

export default PageSlice.reducer