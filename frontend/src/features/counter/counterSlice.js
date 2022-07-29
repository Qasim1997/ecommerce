import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  search: 30
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
      state.search += 1

    },
    decrement: (state) => {
      state.value -= 1
    },
    unsetSearchInfo:(state , action)=> {
      state.search = action.payload.search
  
  }
  
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, unsetSearchInfo } = counterSlice.actions

export default counterSlice.reducer