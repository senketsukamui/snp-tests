import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { actions } from './slice';
import { normalize, schema } from 'normalizr';

const normalizeData = data => {
  const answer = new schema.Entity('answers');

  const question = new schema.Entity('questions', {
    answers: [answer],
  });

  const test = new schema.Entity('tests', {
    questions: [question],
  });
  return normalize(data, [test]);
};

export function* getTests({ payload }) {
  try {
    const response = yield call(api.getTests, payload);

    const normalizedData = normalizeData(response.data.tests);
    yield put({
      type: actions.getTestsSuccess.type,
      payload: {
        entities: normalizedData.entities,
        meta: response.data.meta,
        result: normalizedData.result,
      },
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

export function* getTestById({ payload }) {
  try {
    const response = yield call(api.getTestById, payload);
    const normalizedData = normalizeData([response.data]);
    if (response.status === 200) {
      yield put({
        type: actions.getTestsSuccess.type,
        payload: {
          entities: normalizedData.entities,
          meta: response.data.meta,
          result: normalizedData.result,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(actions.getTests, getTests),
    takeLatest(actions.getTestById, getTestById),
    takeLatest(actions.createTest, createTest),
    takeLatest(actions.editTest, editTest),
    takeLatest(actions.deleteTest, deleteTest),
  ]);
}
