import {call, put, takeLatest} from 'redux-saga/effects'
import { goodsApi } from '../api/goods-api'
import { goodsRequestError,
         getGoodsSuccess, 
         getProductSuccess, 
         getGoodsByCategorySuccess } from './goodsSlice'


function* goodsRequestWorker() {
  try {
    const goods = yield call(goodsApi.getGoods)
    yield put(getGoodsSuccess({goods}))
  } catch (error) {
    let message = error.message
    yield put(goodsRequestError({message}))
  }
}

function* goodsByCategoryRequestWorker(action) {
  try {
    const category = action.payload.goodsType
    const goods = yield call(goodsApi.getGoodsByCategory, category)
    yield put(getGoodsByCategorySuccess({goods}))
  } catch (error) {
    let message = error.message
    yield put(goodsRequestError({message}))
  }
}

function* productRequestWorker(action) {
  try {
    const id = action.payload.id
    const product = yield call(goodsApi.getProduct, id)
    yield put(getProductSuccess({product}))
  } catch (error) {
    let message = error.message
    yield put(goodsRequestError({message}))
  }
}

export default function* goodsSagatWatcher() {
  yield takeLatest('goods/getGoods', goodsRequestWorker)
  yield takeLatest('goods/getProduct', productRequestWorker)
  yield takeLatest('goods/getGoodsByCategory', goodsByCategoryRequestWorker)
}