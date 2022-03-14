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
      })
    },
    removeGoods(state, action) {
      state.cartGoods = state.cartGoods.filter(el => {
        console.log(el.id, action.payload.id)
        console.log(el.size, action.payload.size)
        console.log(el.color, action.payload.color)
        return el.id !== action.payload.id
               || el.size !== action.payload.size 
               || el.color !== action.payload.color
      })
    },
    changeQauntityGoods(state, action) {
      const targetGoods = state.cartGoods.find(el => {
        return el.id === action.id && el.size === action.size && el.color === action.color
      })
      targetGoods.quantity = action.quantity
    }
  }
})

export const {addGoods, removeGoods, changeQauntityGoods} = cartSlice.actions

export default cartSlice.reducer