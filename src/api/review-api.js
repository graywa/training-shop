import { instance } from './api'

export const reviewApi = {
  review(id, name, text, rating) {
    console.log(id, name, text, rating)
    return instance
      .post('product/review', { id, name, text, rating })
      .then((response) => response.data)
  },
}
