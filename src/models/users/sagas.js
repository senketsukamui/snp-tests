import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';

export function* userLogin({ payload }) {
  try {
    console.log(payload);
    const response = yield call(api.userLogin, payload);
    console.log(response);
    yield put({
      type: actions.userLoginSuccess.type,
      payload: {
        isAdmin: response.data.is_admin,
        username: response.data.username,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(actions.userLogin, userLogin)]);
}
