import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';

export function* createAnswer({ payload }) {
  try {
    const response = yield call(
      api.createAnswer,
      payload.questionId,
      payload.answer
    );
    if (response.status === 200) {
      yield put({
        type: actions.createAnswerSuccess.type,
        payload: {
          answer: response.data,
          questionId: payload.questionId,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export function* editAnswer({ payload }) {
  try {
    const response = yield call(api.editAnswer, payload);
    if (response.status === 200) {
      yield put({
        type: actions.editAnswerSuccess.type,
        payload: {
          ...response.data,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(actions.createAnswer, createAnswer),
    takeLatest(actions.editAnswer, editAnswer),
  ]);
}
