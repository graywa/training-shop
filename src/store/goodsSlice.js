import { createSlice } from '@reduxjs/toolkit'

const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goods: {
      men: [],
      women: [],
    },    
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    getGoods(state) {
      state.isLoading = true       
    },
    getProduct(state, action) {
      state.isLoading = true
    },
    getGoodsSuccess(state, action) {
      state.isLoading = false
      state.errorMessage = ''
      console.log(action)
      state.goods = action.payload.goods
    },
    getProductSuccess(state, action) {
      
      state.isLoading = false
      state.errorMessage = ''
      const category = action.payload.product.category.toLowerCase()
      console.log(category)
      state.goods[category].push(action.payload.product) 
    },
    goodsRequestError(state, action) {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload.message
    }
  }
})

export const {getGoods, getProduct, getGoodsSuccess,  getProductSuccess, goodsRequestError} = goodsSlice.actions

export default goodsSlice.reducer