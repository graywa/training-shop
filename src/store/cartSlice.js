import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartGoods: [],
  },
  reducers: {
    addGoods(state, action) {
      state.cartGoods.push({
        id: action.payload.id,
        name: action.payload.name,
        size: action.payload.size,
        color: action.payload.color,
        photo: action.payload.photo,
        price: action.payload.price,
        quantity: 1,
      })
    },
    removeGoods(state, {payload: {newCartGoods}}) {
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
  removeGoods,
  changeQuantityGoods,
  setGoodsFromLocalStorage,
  resetCartGoods,
} = cartSlice.actions

export default cartSlice.reducer
