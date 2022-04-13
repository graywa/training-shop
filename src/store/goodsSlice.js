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
    getGoodsByCategory(state) {
      state.isLoading = true      
    },
    getProduct(state) {
      state.isLoading = true  
    },
    getGoodsSuccess(state, action) {
      state.isLoading = false    
      state.errorMessage = ''
      state.isError = false  
      state.goods = action.payload.goods
    },
    getGoodsByCategorySuccess(state, action) {
      state.isLoading = false
      state.errorMessage = ''
      state.isError = false
      const category = action.payload.goods[0].category
      state.goods[category] = action.payload.goods
    },
    getProductSuccess(state, action) {      
      state.isLoading = false
      state.errorMessage = ''
      state.isError = false
      const category = action.payload.product.category.toLowerCase()
      const id = action.payload.product.id
      state.goods[category] = state.goods[category].filter(el => el.id !== id)
      state.goods[category].push(action.payload.product) 
    },
    goodsRequestError(state, action) {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload.message
    },
  }
})

export const {getGoods,
              getProduct,
              getGoodsByCategory,
              getGoodsByCategorySuccess,
              getGoodsSuccess,  
              getProductSuccess, 
              goodsRequestError} = goodsSlice.actions

export default goodsSlice.reducer