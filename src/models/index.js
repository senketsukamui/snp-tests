import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import usersReducer from './users/slice';

import usersSagas from './users/sagas';

import testsReducer from './testsq/slice';

import testsSagas from './testsq/sagas';

import questionsReducer from './questions/slice';

import questionsSagas from './questions/sagas';

import answersReducer from './answers/slice';

import answersSagas from './answers/sagas';

export const createRootReducer = history => ({
  router: connectRouter(history),
  users: usersReducer,
  tests: testsReducer,
  questions: questionsReducer,
  answers: answersReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([testsSagas(), usersSagas(), questionsSagas(), answersSagas()]);
};
