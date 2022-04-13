import { instance } from './api'

export const orderApi = {
  getCountries() {
    return instance.get('countries').then((response) => response.data)
  },
  getStoreAddress(city, country) {
    return instance
      .post('search/cities', { city, country })
      .then((response) => response.data)
  },
}