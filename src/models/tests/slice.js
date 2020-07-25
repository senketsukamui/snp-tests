/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { questions } from 'models/questions/slice';

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
  },
  // extraReducers: {
  //   [questions.actions.createQuestionSuccess]: (state, { payload }) => {
  //     state.tests[payload.testId].questions.push(payload.question.id);
  //   },
  // },
});

export const actions = actionTypes(testsSlice.actions);
export const getTests = testsSlice.actions.getTests;

export const tests = testsSlice;

export default testsSlice.reducer;
