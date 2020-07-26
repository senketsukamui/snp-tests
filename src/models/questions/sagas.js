/* eslint-disable no-param-reassign */

import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';

console.log(api);

export function* createQuestion({ payload }) {
  try {
    console.log(payload);
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

export default function*() {
  yield all([takeLatest(actions.createQuestion, createQuestion)]);
}
