import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 email : '',
 name: '',
 profile: ''
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  setUserInfo:(state , action)=> {
      state.email = action.payload.email
      state.name = action.payload.name
      state.profile = action.payload.profile


  },
  unsetUserInfo:(state , action)=> {
    state.email = action.payload.email
    state.name = action.payload.name
    state.profile = action.payload.profile

}

  },
})

export const { setUserInfo , unsetUserInfo } = userSlice.actions

export default userSlice.reducer