import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';
import { normalize, schema } from 'normalizr';

export function* getTests() {
  try {
    const response = yield call(api.getTests);

    const answer = new schema.Entity('answers');

    const question = new schema.Entity('questions', {
      answers: [answer],
    });

    const test = new schema.Entity('tests', {
      questions: [question],
    });

    const normalizedData = normalize(response.data.tests, [test]);
    console.log(normalizedData);
    yield put({
      type: actions.getTestsSuccess.type,
      payload: { entities: normalizedData.entities, meta: response.data.meta },
    });
  } catch (error) {
    console.error(error);
  }
}

export function* createTest({ payload }) {
  try {
    const response = yield call(api.createTest, payload);
    yield put({
      type: actions.createTestSuccess.type,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* editTest({ payload }) {
  try {
    const response = yield call(api.editTest, payload);
    yield put({
      type: actions.editTestSuccess.type,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* deleteTest({ payload }) {
  try {
    yield call(api.deleteTest, payload);
    yield put({
      type: actions.deleteTestSuccess.type,
      payload,
    });
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(actions.getTests, getTests),
    takeLatest(actions.createTest, createTest),
    takeLatest(actions.editTest, editTest),
    takeLatest(actions.deleteTest, deleteTest),
  ]);
}
