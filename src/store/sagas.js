import {call, put, takeLatest} from 'redux-saga/effects'
import { goodsApi } from '../api/goods-api'
import { orderApi } from '../api/order-api'
import { reviewApi } from '../api/review-api'
import { subscribeApi } from '../api/subscribe-api'
import { goodsRequestError,
         getGoodsSuccess, 
         getProductSuccess, 
         getGoodsByCategorySuccess } from './goodsSlice'
import { postOrderError, postOrderSuccess, reqCountriesError, reqStoreAddressError, respCountriesSeccess, respStoreAddressSeccess } from './orderSlice'
import { sendReviewError, sendReviewSeccess } from './reviewSlice'
import { subscribeError, subscribeSeccess } from './subscribeSlice'


function* goodsReqWorker() {
  try {
    const goods = yield call(goodsApi.getGoods)
    yield put(getGoodsSuccess({goods}))
  } catch (error) {
    let message = error.message
    yield put(goodsRequestError({message}))
  }
}

function* goodsByCategoryReqWorker(action) {
  try {
    const category = action.payload.goodsType
    const goods = yield call(goodsApi.getGoodsByCategory, category)
    yield put(getGoodsByCategorySuccess({goods}))
  } catch (error) {
    let message = error.message
    yield put(goodsRequestError({message}))
  }
}

function* productReqWorker(action) {
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

function* countriesReqWorker() {
  try {
    const countries = yield call(orderApi.getCountries)
    yield put(respCountriesSeccess({countries}))
  } catch (error) {
    let message = error.message
    yield put(reqCountriesError({message}))
  }
}

function* storeAddressReqWorker(action) {
  try {
    const {city, country} = action.payload
    const storeAddress = yield call(orderApi.getStoreAddress, city, country)
    yield put(respStoreAddressSeccess({storeAddress}))
  } catch (error) {
    let message = error.message
    yield put(reqStoreAddressError({message}))
  }
}

function* postOrderWorker(action) {
  try {    
    const order = action.payload.order
    yield call(orderApi.postOrder, order)    
    yield put(postOrderSuccess())
  } catch (error) {
    const message = error.message    
    yield put(postOrderError({message}))
  }
}

export default function* sagaWatcher() {
  yield takeLatest('goods/getGoods', goodsReqWorker)
  yield takeLatest('goods/getProduct', productReqWorker)
  yield takeLatest('goods/getGoodsByCategory', goodsByCategoryReqWorker)
  yield takeLatest('subscribe/startSubscribe', subscribeWorker)
  yield takeLatest('review/startSendReview', reviewSendWorker)
  yield takeLatest('order/getCountries', countriesReqWorker)
  yield takeLatest('order/getStoreAddress', storeAddressReqWorker)
  yield takeLatest('order/startPostOrder', postOrderWorker)
}