import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartGoods: []
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
        quantity: 1
      })
    },
    removeGoods(state, action) {
      state.cartGoods = state.cartGoods.filter(el => {
        return el.id !== action.payload.id
               || el.size !== action.payload.size 
               || el.color !== action.payload.color
      })
    },
    changeQuantityGoods(state, action) {
      const targetGoods = state.cartGoods.find(el => {
        return el.id === action.payload.id 
              && el.size === action.payload.size 
              && el.color === action.payload.color
      })
      targetGoods.quantity = action.payload.quantity
    }
  }
})

export const {addGoods, removeGoods, changeQuantityGoods} = cartSlice.actions

export default cartSlice.reducer