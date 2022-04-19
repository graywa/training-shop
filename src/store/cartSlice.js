import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartGoods: [],
  },
  reducers: {
    addGoods(state, {payload: {oneGoods}}) {
      state.cartGoods.push(oneGoods)
    },
    updateCartGoods(state, {payload: {newCartGoods}}) {
      state.cartGoods = newCartGoods
    },
    changeQuantityGoods(state, {payload: {newCartGoods}}) {
      state.cartGoods = newCartGoods
    },
    setGoodsFromLocalStorage(state, {payload: {cartGoodsLocal}}) {
      state.cartGoods = cartGoodsLocal
    },
    resetCartGoods(state) {
      state.cartGoods = []
    },
  },
})

export const {
  addGoods,
  updateCartGoods,
  setGoodsFromLocalStorage,
  resetCartGoods,
} = cartSlice.actions

export default cartSlice.reducer
