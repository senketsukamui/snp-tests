import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';

export function* userLogin({ payload }) {
  try {
    const response = yield call(api.userLogin, payload);
    if (response.status === 200) {
      yield put({
        type: actions.userLoginSuccess.type,
        payload: {
          isAdmin: response.data.is_admin,
          username: response.data.username,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export function* currentSession() {
  try {
    const response = yield call(api.currentSession);
    yield put({
      type: actions.currentSessionSuccess.type,
      payload: {
        isAdmin: response.data.is_admin,
        username: response.data.username,
      },
    });
  } catch (error) {
    yield put({
      type: actions.currentSessionFailed.type,
    });
  }
}

export function* userLogout() {
  try {
    const response = yield call(api.userLogout);
    if (response.data.success === true) {
      yield put({ type: actions.userLogoutSuccess.type });
    }
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(actions.userLogin, userLogin)]);
  yield all([takeLatest(actions.currentSession, currentSession)]);
  yield all([takeLatest(actions.userLogout, userLogout)]);
}
