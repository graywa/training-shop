import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://training.cleverland.by/shop/'
})