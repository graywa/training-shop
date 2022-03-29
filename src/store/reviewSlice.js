import { createSlice } from '@reduxjs/toolkit'

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    rating: 1,
    isSeccess: false,
    isLoading: false,
    isError: false,
    errorMessage: ''
  },
  reducers: {  
    changeRating(state, action) {
      state.rating = action.payload.rating
    },
    startSendReview(state, action) {
      state.isLoading = true
    },
    sendReviewSeccess(state, action) {
      state.isSeccess = true
      state.isLoading = false
      state.isError = false
      state.errorMessage = ''
    },
    resetReviewSeccess(state, action) {
      state.isSeccess = false
    },
    sendReviewError(state, action) {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
    resetReviewError(state, action) {
      state.isError = false
      state.errorMessage = ''
    },
  }
})

export const {
  changeRating,
  startSendReview,
  sendReviewSeccess,
  resetReviewSeccess,
  sendReviewError,
  resetReviewError,
  } = reviewSlice.actions

export default reviewSlice.reducer