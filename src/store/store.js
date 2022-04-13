import { configureStore} from '@reduxjs/toolkit'
import cart from './cartSlice'
import goods from './goodsSlice'
import review from './reviewSlice'
import subscribe from './subscribeSlice'
import order from './orderSlice'
import createSagaMiddleware from 'redux-saga'
import sagaWatcher from './sagas'

const saga = createSagaMiddleware()

export default configureStore({
  reducer: {
    cart,
    goods,
    subscribe,
    review,
    order,
  },
  middleware: [saga],
})

saga.run(sagaWatcher)