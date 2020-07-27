/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { constructAction, ACTION_PREFIXES } from '../../utils/constructAction';

const actionGetTestsSuccess = createAction(
  constructAction('getTestsSuccess', ACTION_PREFIXES.testsPrefix)
);

const initialState = {
  questions: {},
  questionsLoading: false,
};

const questionsSlice = createSlice({
  name: 'questionsSlice',
  initialState,
  reducers: {
    createQuestion: state => {
      state.questionsLoading = true;
    },
    createQuestionSuccess: (state, { payload }) => {
      state.questions[payload.question.id] = payload.question;
      state.questionsLoading = false;
    },
    deleteQuestion: state => {
      state.questionsLoading = true;
    },
    deleteQuestionSuccess: (state, { payload }) => {
      delete state.questions[payload.questionId];
      state.questionsLoading = false;
    },
  },
  extraReducers: {
    [actionGetTestsSuccess]: (state, { payload }) => {
      state.questions = payload.questions;
    },
  },
});

export const actions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
