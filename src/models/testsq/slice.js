/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { actions as questionsActions } from 'models/questions/slice';
import { constructAction, ACTION_PREFIXES } from '../../utils/constructAction';

const actionCreateQuestionSuccess = createAction(
  constructAction('createQuestionSuccess', ACTION_PREFIXES.questionPrefix)
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
  },
  extraReducers: {
    [actionCreateQuestionSuccess]: (state, { payload }) => {
      console.log(payload);
      state.tests[payload.id].questions.push(payload.question.id);
    },
  },
});

export const actions = actionTypes(testsSlice.actions);

export const getTests = testsSlice.actions.getTests;

export default testsSlice.reducer;
