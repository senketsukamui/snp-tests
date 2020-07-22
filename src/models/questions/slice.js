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
    getQuestions: state => {
      state.questionsLoading = true;
    },
  },
  extraReducers: {
    [tests.actions.getTestsSuccess]: (state, action) => {
      state.questions = action.payload.reduce((acc, value) => {
        acc[value.id] = value.questions;
        return acc;
      }, {});
    },
  },
});

export const actions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
