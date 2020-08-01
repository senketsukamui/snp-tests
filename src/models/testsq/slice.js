/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { constructAction, ACTION_PREFIXES } from '../../utils/constructAction';

const actionCreateQuestionSuccess = createAction(
  constructAction('createQuestionSuccess', ACTION_PREFIXES.questionPrefix)
);

const actionDeleteQuestionSuccess = createAction(
  constructAction('deleteQuestionSuccess', ACTION_PREFIXES.questionPrefix)
);

const initialState = {
  tests: {},
  testsLoading: false,
};

const testsSlice = createSlice({
  name: 'testsSlice',
  initialState,
  reducers: {
    getTests: state => {
      state.testsLoading = true;
    },
    getTestsSuccess: (state, { payload }) => {
      state.testsLoading = false;
      state.tests = payload.tests;
    },
    createTest: state => {
      state.testsLoading = true;
    },
    createTestSuccess: (state, { payload }) => {
      state.testsLoading = false;
      state[payload.id] = payload;
    },
    editTest: state => {
      state.testsLoading = true;
    },
    editTestSuccess: (state, { payload }) => {
      state.testsLoading = false;
      state.tests[payload.id].title = payload.title;
    },
    deleteTest: state => {
      state.testsLoading = true;
    },
    deleteTestSuccess: (state, { payload }) => {
      state.testsLoading = false;
      delete state.tests[payload.id];
    },
  },
  extraReducers: {
    [actionCreateQuestionSuccess]: (state, { payload }) => {
      state.tests[payload.id].questions.push(payload.question.id);
    },

    [actionDeleteQuestionSuccess]: (state, { payload }) => {
      state.tests[payload.testId].questions = state.tests[
        payload.testId
      ].questions.filter(e => {
        return e !== payload.questionId;
      });
    },
  },
});

export const actions = actionTypes(testsSlice.actions);

export const { getTests } = testsSlice.actions;

export default testsSlice.reducer;
