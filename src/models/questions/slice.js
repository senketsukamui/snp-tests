/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { tests } from 'models/tests/slice';

const initialState = {
  questions: {},
  questionsLoading: false,
};

const questionsSlice = createSlice({
  name: 'questionsSlice',
  initialState,
  reducers: {
    // createQuestion: state => {
    //   state.questionsLoading = true;
    // },
    // createQuestionSuccess: (state, { payload }) => {
    //   state.questions[payload.question.id] = payload.question;
    //   state.questionsLoading = false;
    // },
  },
  extraReducers: {
    [tests.actions.getTestsSuccess]: (state, action) => {
      state.questions = action.payload.questions;
    },
  },
});

export const actions = actionTypes(questionsSlice.actions);

export const createQuestion = questionsSlice.actions.createQuestion;

export const questions = questionsSlice;

export default questionsSlice.reducer;
