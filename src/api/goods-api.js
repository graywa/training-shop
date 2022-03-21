import { instance } from './api'

export const goodsApi = {
  getGoods() {
    return instance.get('products')
      .then(response => response.data)
  },
  getGoodsByCategory(category) {
    return instance.get(`products/${category}`)
      .then(response => response.data)
  },
  getProduct(id) {
    return instance.get(`product/${id}`)
      .then(response => response.data)
  }
}