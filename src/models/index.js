import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import usersReducer from './users/slice';

import usersSagas from './users/sagas';

import testsReducer from './tests/slice';

import testsSagas from './tests/sagas';

export const createRootReducer = history => ({
  router: connectRouter(history),
  users: usersReducer,
  tests: testsReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([usersSagas(), testsSagas()]);
};
