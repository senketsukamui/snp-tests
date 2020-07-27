/* eslint-disable no-param-reassign */

import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';

export function* createQuestion({ payload }) {
  try {
    const response = yield call(api.createQuestion, payload);
    if (response.status === 200) {
      yield put({
        type: actions.createQuestionSuccess.type,
        payload: {
          question: response.data,
          id: payload.testId,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export function* deleteQuestion({ payload }) {
  try {
    console.log(payload);

    const response = yield call(api.deleteQuestion, payload.questionId);
    if (response.status === 200) {
      yield put({
        type: actions.deleteQuestionSuccess.type,
        payload,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(actions.createQuestion, createQuestion),
    takeLatest(actions.deleteQuestion, deleteQuestion),
  ]);
}
