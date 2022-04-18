import {call, put, takeLatest} from 'redux-saga/effects'
import { goodsApi } from '../api/goods-api'
import { orderApi } from '../api/order-api'
import { reviewApi } from '../api/review-api'
import { subscribeApi } from '../api/subscribe-api'
import { resetCartGoods } from './cartSlice'
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
  } catch ({message}) {
    yield put(goodsRequestError({message}))
  }
}

function* goodsByCategoryReqWorker({payload: {goodsType: category}}) {
  try {
    const goods = yield call(goodsApi.getGoodsByCategory, category)
    yield put(getGoodsByCategorySuccess({goods}))
  } catch ({message}) {
    yield put(goodsRequestError({message}))
  }
}

function* productReqWorker({payload: {id}}) {
  try {
    const product = yield call(goodsApi.getProduct, id)
    yield put(getProductSuccess({product}))
  } catch ({message}) {
    yield put(goodsRequestError({message}))
  }
}

function* subscribeWorker({payload: {email, description}}) {
  try {
    yield call(subscribeApi.subscribe, email)
    yield put(subscribeSeccess({description}))
  } catch ({message}) {
    yield put(subscribeError({message, description}))
  }
}

function* reviewSendWorker({payload: {id, name, text, rating}}) {
  try {
    const product = yield call(reviewApi.review, id, name, text, rating)
    yield put(sendReviewSeccess())
    yield put(getProductSuccess({product}))
  } catch ({message}) {
    yield put(sendReviewError({message}))
  }
}

function* countriesReqWorker() {
  try {
    const countries = yield call(orderApi.getCountries)
    yield put(respCountriesSeccess({countries}))
  } catch ({message}) {
    yield put(reqCountriesError({message}))
  }
}

function* storeAddressReqWorker({payload: {city, country}}) {
  try {
    const storeAddress = yield call(orderApi.getStoreAddress, city, country)
    yield put(respStoreAddressSeccess({storeAddress}))
  } catch ({message}) {
    yield put(reqStoreAddressError({message}))
  }
}

function* postOrderWorker({payload: {order}}) {
  try {    
    const {message} = yield call(orderApi.postOrder, order)  
    if(message === 'success') {
      yield put(postOrderSuccess())
      yield put(resetCartGoods())
    }    
  } catch ({message}) {      
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