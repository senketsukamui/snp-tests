/* eslint-disable no-param-reassign */
import { createSlice, createAction } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { constructAction, ACTION_PREFIXES } from 'utils/constructAction';

const actionGetTestsSuccess = createAction(
  constructAction('getTestsSuccess', ACTION_PREFIXES.testsPrefix)
);

const initialState = {
  answers: {},
  answersLoading: false,
};

const answersSlice = createSlice({
  name: 'answersSlice',
  initialState,
  reducers: {
    createAnswer: state => {
      state.answersLoading = true;
    },
    createAnswerSuccess: (state, { payload }) => {
      state.answersLoading = false;
      state.answers[payload.answer.id] = payload.answer;
    },
    editAnswer: state => {
      state.answersLoading = true;
    },
    editAnswerSuccess: (state, { payload }) => {
      state.answersLoading = false;
      state.answers[payload.id] = payload;
    },
    deleteAnswer: state => {
      state.answersLoading = true;
    },
    deleteAnswerSuccess: (state, { payload }) => {
      state.answersLoading = false;
      delete state.answers[payload.id];
    },
  },
  extraReducers: {
    [actionGetTestsSuccess]: (state, { payload }) => {
      state.answers = payload.entities.answers || {};
    },
  },
});

export const actions = actionTypes(answersSlice.actions);

export default answersSlice.reducer;
