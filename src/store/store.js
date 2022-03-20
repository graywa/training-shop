import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import cart from './cartSlice'
import goods from './goodsSlice'
import createSagaMiddleware from 'redux-saga'
import goodsSagatWatcher from './goodsSagas'

const saga = createSagaMiddleware()

export default configureStore({
  reducer: {
    cart,
    goods,
  },
  middleware: [saga],
})

saga.run(goodsSagatWatcher)