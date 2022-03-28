import { instance } from './api'

export const subscribeApi = {
  subscribe(email) {
    return instance.post('email', {
      "mail": email
    })
      .then(response => response.data)
  },  
}