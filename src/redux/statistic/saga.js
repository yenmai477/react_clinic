import { all, call, put, takeLatest } from 'redux-saga/effects';
import apiCall from '../../helpers/apiCall';
import {
  getGeneralStatisticFail,
  getGeneralStatisticSuccess,
  getMonthlyRevenueFail,
  getMonthlyRevenueSuccess,
  getRevenueInRangeFail,
  getRevenueInRangeSuccess,
  getTopFiveMedicineQuantityFail,
  getTopFiveMedicineQuantitySuccess,
  getTopFiveMedicineUsed,
  getTopFiveMedicineUsedFail,
  getTopFiveMedicineUsedSuccess,
} from './action';
import {
  GET_GENERAL_STATISTIC,
  GET_MONTHLY_REVENUE,
  GET_REVENUE_IN_RANGE,
  GET_TOP_FIVE_MEDICINE_QUANTITY,
  GET_TOP_FIVE_MEDICINE_USED,
} from './constant';

// GET RENVENUE
function* getMonthlyRevenueSaga({ payload: { month, year } }) {
  try {
    const { data: response } = yield call(() => apiCall.get(`/statistic/monthlyRevenue?month=${month}&year=${year}`));
    yield put(getMonthlyRevenueSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getMonthlyRevenueFail(message));
  }
}

// GET RENVENUE
function* getRevenueInRangeSaga({ payload: { fromDate, toDate } }) {
  try {
    const { data: response } = yield call(() =>
      apiCall.get(`statistic/revenueInRange?fromDate=${fromDate}&toDate=${toDate}`)
    );
    yield put(getRevenueInRangeSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getRevenueInRangeFail(message));
  }
}

// GET GENERAL STATISTIC
function* getGeneralStatisticSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get(`/statistic/general`));
    yield put(getGeneralStatisticSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getGeneralStatisticFail(message));
  }
}

// GET TOP FIVE MEDICINES USED
function* getTopFiveUsedSaga() {
  try {
    const { data: response } = yield call(() => apiCall.get(`/statistic/topFiveUsed`));
    yield put(getTopFiveMedicineUsedSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getTopFiveMedicineUsedFail(message));
  }
}

// GET TOP FIVE MEDICINES QUANTITY
function* getTopFiveMedicineQtySaga() {
  try {
    const { data: response } = yield call(() => apiCall.get(`/statistic/topFiveQuantityUsed`));
    yield put(getTopFiveMedicineQuantitySuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getTopFiveMedicineQuantityFail(message));
  }
}

export function* watchGetMonthlyRevenue() {
  yield takeLatest(GET_MONTHLY_REVENUE, getMonthlyRevenueSaga);
}

export function* watchRevenueInRange() {
  yield takeLatest(GET_REVENUE_IN_RANGE, getRevenueInRangeSaga);
}

export function* watchGetGeneralStatistic() {
  yield takeLatest(GET_GENERAL_STATISTIC, getGeneralStatisticSaga);
}
export function* watchGetTopFiveUsed() {
  yield takeLatest(GET_TOP_FIVE_MEDICINE_USED, getTopFiveUsedSaga);
}

export function* watchGetTopFiveQtyUsed() {
  yield takeLatest(GET_TOP_FIVE_MEDICINE_QUANTITY, getTopFiveMedicineQtySaga);
}

function* statisticSaga() {
  yield all([
    call(watchGetMonthlyRevenue),
    call(watchGetGeneralStatistic),
    call(watchRevenueInRange),
    call(watchGetTopFiveUsed),
    call(watchGetTopFiveQtyUsed),
  ]);
}

export default statisticSaga;
