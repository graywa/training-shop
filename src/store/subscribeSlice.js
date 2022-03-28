import { createSlice } from '@reduxjs/toolkit'

const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState: {
    isSeccess: false,
    isLoading: false,
    isError: false,
    errorMessage: ''
  },
  reducers: {  
    startSubscribe(state, action) {
      state.isLoading = true
    },
    subscribeSeccess(state, action) {
      state.isLoading = false
      state.isError = false
      state.isSeccess = true
      state.errorMessage = ''
    },
    resetSubscribeSeccess(state, action) {
      state.isSeccess = false
    },
    subscribeError(state, action) {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload.message
    }    
  }
})

export const {
  startSubscribe, 
  subscribeSeccess,
  resetSubscribeSeccess, 
  subscribeError} = subscribeSlice.actions

export default subscribeSlice.reducer