import {call, put, takeLatest} from 'redux-saga/effects'
import { goodsApi } from '../api/goods-api'
import { reviewApi } from '../api/review-api'
import { subscribeApi } from '../api/subscribe-api'
import { goodsRequestError,
         getGoodsSuccess, 
         getProductSuccess, 
         getGoodsByCategorySuccess } from './goodsSlice'
import { sendReviewError, sendReviewSeccess } from './reviewSlice'
import { subscribeError, subscribeSeccess } from './subscribeSlice'


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

function* subscribeWorker(action) {
  try {
    const email = action.payload.email
    const description = action.payload.description
    yield call(subscribeApi.subscribe, email)
    yield put(subscribeSeccess({description}))
  } catch (error) {
    const message = error.message
    const description = action.payload.description
    yield put(subscribeError({message, description}))
  }
}

function* reviewSendWorker(action) {
  try {
    const {id, name, text, rating} = action.payload
    const product = yield call(reviewApi.review, id, name, text, rating)
    yield put(sendReviewSeccess())
    yield put(getProductSuccess({product}))
  } catch (error) {
    const message = error.message
    yield put(sendReviewError({message}))
  }
}


export default function* sagaWatcher() {
  yield takeLatest('goods/getGoods', goodsRequestWorker)
  yield takeLatest('goods/getProduct', productRequestWorker)
  yield takeLatest('goods/getGoodsByCategory', goodsByCategoryRequestWorker)
  yield takeLatest('subscribe/startSubscribe', subscribeWorker)
  yield takeLatest('review/startSendReview', reviewSendWorker)
}