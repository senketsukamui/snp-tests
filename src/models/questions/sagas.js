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

export function* editQuestion({ payload }) {
  try {
    const response = yield call(api.editQuestion, payload);
    if (response.status === 200) {
      yield put({
        type: actions.editQuestionSuccess.type,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export function* swapAnswers({ payload }) {
  try {
    yield call(api.swapAnswers, payload);
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(actions.createQuestion, createQuestion),
    takeLatest(actions.deleteQuestion, deleteQuestion),
    takeLatest(actions.editQuestion, editQuestion),
    takeLatest(actions.swapAnswers, swapAnswers),
  ]);
}
