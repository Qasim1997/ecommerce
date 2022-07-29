import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 search : '',
}

export const userSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  setSearchInfo:(state , action)=> {
      state.search = action.payload.search

  },
  unsetSearchInfo:(state , action)=> {
    state.search = action.payload.search

}

  },
})

export const { setSearchInfo , unsetSearchInfo } = userSlice.actions

export default userSlice.reducer