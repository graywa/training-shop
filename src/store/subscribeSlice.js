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
      console.log(action)
      state.isLoading = action.payload.description
    },
    subscribeSeccess(state, action) {
      state.isLoading = false
      state.isError = false
      state.isSeccess = action.payload.description
      state.errorMessage = ''
    },
    resetSubscribeSeccess(state, action) {
      state.isSeccess = false
    },
    subscribeError(state, action) {
      state.isLoading = false
      state.isError = action.payload.description
      state.errorMessage = action.payload.message
    },
    resetSubscribeError(state, action) {
      state.isError = false
      state.errorMessage = ''
    },
  }
})

export const {
  startSubscribe, 
  subscribeSeccess,
  resetSubscribeSeccess, 
  subscribeError,
  resetSubscribeError} = subscribeSlice.actions

export default subscribeSlice.reducer