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
    getCountries(state) {
      state.isLoading = 'countries'
    },
    getStoreAddress(state) {
      state.isLoading = 'storeAddress'
    },
    respCountriesSeccess(state, {payload: {countries}}) {
      state.countries = countries
      state.isLoading = false
      state.countriesError = ''
    },
    respStoreAddressSeccess(state, {payload: {storeAddress}}) {
      state.storeAddress = storeAddress
      state.isLoading = false
      state.storeAddressError = ''
    },
    resetStoreAddress(state) {
      state.storeAddress = []
    },
    reqCountriesError(state, {payload: {message}}) {
      state.isLoading = false
      state.countriesError = message
    },
    reqStoreAddressError(state, {payload: {message}}) {
      state.isLoading = false
      state.storeAddressError = message
    },
    updOrder(state, {payload: {fields}}) {
      state.order = {...state.order,...fields}
    },
    startPostOrder(state) {
      state.isLoading = 'order'   
      state.orderSuccess = false   
    },
    postOrderSuccess(state) {
      state.order = { 
        products: [] 
      }
      state.isLoading = false
      state.orderSuccess = true
      state.orderError = ''
    },
    postOrderError(state, {payload: {message}}) {
      state.orderSuccess = false
      state.isLoading = false
      state.orderError = message
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
