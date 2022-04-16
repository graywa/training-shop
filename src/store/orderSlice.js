import { createSlice } from '@reduxjs/toolkit'


const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {
      products: [],      
    },
    orderError: '',
    orderSuccess: false,
    countries: [],
    storeAddress: [],
    isLoading: false,
    countriesError: '',
    storeAddressError: '',
  },
  reducers: {
    getCountries(state, action) {
      state.isLoading = 'countries'
    },
    getStoreAddress(state, action) {
      state.isLoading = 'storeAddress'
    },
    respCountriesSeccess(state, action) {
      state.countries = action.payload.countries
      state.isLoading = false
      state.countriesError = ''
    },
    respStoreAddressSeccess(state, action) {
      state.storeAddress = action.payload.storeAddress
      state.isLoading = false
      state.storeAddressError = ''
    },
    resetStoreAddress(state, action) {
      state.storeAddress = []
    },
    reqCountriesError(state, action) {
      state.isLoading = false
      state.countriesError = action.payload.message
    },
    reqStoreAddressError(state, action) {
      state.isLoading = false
      state.storeAddressError = action.payload.message
    },
    updOrder(state, action) {
      state.order = {...state.order,...action.payload.fields}
    },
    startPostOrder(state, action) {
      state.isLoading = 'order'   
      state.orderSuccess = false   
    },
    postOrderSuccess(state, action) {
      state.order = { 
        products: [] 
      }
      state.isLoading = false
      state.orderSuccess = true
      state.orderError = ''
    },
    postOrderError(state, action) {
      state.orderSuccess = false
      state.isLoading = false
      state.orderError = action.payload.message
    }
  },
})

export const {
  getCountries,
  getStoreAddress,
  respCountriesSeccess,
  respStoreAddressSeccess,
  resetStoreAddress,
  reqCountriesError,
  reqStoreAddressError,
  updOrder,
  startPostOrder,
  postOrderSuccess,
  postOrderError,
} = orderSlice.actions

export default orderSlice.reducer
