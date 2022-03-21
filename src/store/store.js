import { configureStore} from '@reduxjs/toolkit'
import cart from './cartSlice'
import goods from './goodsSlice'
import createSagaMiddleware from 'redux-saga'
import goodsSagasWatcher from './goodsSagas'

const saga = createSagaMiddleware()

export default configureStore({
  reducer: {
    cart,
    goods,
  },
  middleware: [saga],
})

saga.run(goodsSagasWatcher)