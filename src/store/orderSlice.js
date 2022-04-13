import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {
      products: [],
      deliveryMethod: '',
      paymentMethod: '',
      totalPrice: '',
      phone: '',
      email: '',
      country: '',
      cashEmail: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
      postcode: '',
      card: '',
      cardDate: '',
      cardCVV: '',
    },
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
} = orderSlice.actions

export default orderSlice.reducer
