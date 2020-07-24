import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import usersReducer from './users/slice';

import usersSagas from './users/sagas';

import testsReducer from './tests/slice';

import testsSagas from './tests/sagas';

import questionsReducer from './questions/slice';

import answersReducer from './answers/slice';

export const createRootReducer = history => ({
  router: connectRouter(history),
  users: usersReducer,
  tests: testsReducer,
  questions: questionsReducer,
  answers: answersReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([usersSagas(), testsSagas()]);
};
