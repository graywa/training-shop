import { configureStore} from '@reduxjs/toolkit'
import cart from './cartSlice'
import goods from './goodsSlice'
import subscribe from './subscribeSlice'
import createSagaMiddleware from 'redux-saga'
import sagaWatcher from './sagas'

const saga = createSagaMiddleware()

export default configureStore({
  reducer: {
    cart,
    goods,
    subscribe,
  },
  middleware: [saga],
})

saga.run(sagaWatcher)