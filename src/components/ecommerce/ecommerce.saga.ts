import { call, put, takeLatest } from 'redux-saga/effects';
import { ECOMMERCE_SKULIST_REQUEST, ECOMMERCE_CHECKOUT_REQUEST } from './ecommerceActionTypes';
import { ecommerceSKUsAPI, ecommerceCheckoutAPI } from './ecommerce.api';
import {
  createEcommerceRequestSuccess,
  createEcommerceRequestFailed,
  checkoutRequestSuccess,
  checkoutRequestFailed,
} from './ecommerce.actions';

export function* watchEcommerceSKUListActions() {
  yield takeLatest(ECOMMERCE_SKULIST_REQUEST, ecommerceSKUListRequest);
  yield takeLatest(ECOMMERCE_CHECKOUT_REQUEST, ecommerceCheckoutRequest);
}

export function* ecommerceSKUListRequest() {
  try {
    const response = yield call(ecommerceSKUsAPI);
    yield put(createEcommerceRequestSuccess(response));
  } catch (error) {
    console.log('ERROR    ', error);
    yield put(createEcommerceRequestFailed(error));
  }
}

export function* ecommerceCheckoutRequest(listOfProducts) {
  try {
    const response = yield call(ecommerceCheckoutAPI, listOfProducts);
    yield put(checkoutRequestSuccess(response));
  } catch (error) {
    console.log('ERROR    ', error);
    yield put(checkoutRequestFailed(error));
  }
}
