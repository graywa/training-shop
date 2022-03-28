import { instance } from './api'

export const reviewApi = {
  review(id, name, text, rating) {
    return instance.post('review', {
      "id": id,
      "name": name,
      "text": text,
      "rating": rating
    })
      .then(response => response.data)
  },  
}