import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';

export function* getTests() {
  try {
    const response = yield call(api.getTests);
    console.log(response);
    yield put({
      type: actions.getTestsSuccess.type,
      payload: response.data.tests,
    });
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(actions.getTests, getTests)]);
}
