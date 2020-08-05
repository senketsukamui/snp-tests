/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { constructAction, ACTION_PREFIXES } from 'utils/constructAction';

const actionGetTestsSuccess = createAction(
  constructAction('getTestsSuccess', ACTION_PREFIXES.testsPrefix)
);

const actionCreateAnswerSuccess = createAction(
  constructAction('createAnswerSuccess', ACTION_PREFIXES.answersPrefix)
);

const actionDeleteAnswerSuccess = createAction(
  constructAction('deleteAnswerSuccess', ACTION_PREFIXES.answersPrefix)
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
    editQuestion: state => {
      state.questionsLoading = true;
    },
    editQuestionSuccess: (state, { payload }) => {
      state.questionsLoading = false;
      state.questions[payload.id] = payload;
    },
    deleteQuestion: state => {
      state.questionsLoading = true;
    },
    deleteQuestionSuccess: (state, { payload }) => {
      delete state.questions[payload.questionId];
      state.questionsLoading = false;
    },
    swapAnswers: (state, { payload }) => {
      const draggableAnswers = state.questions[payload.questionId].answers;
      [
        draggableAnswers[payload.dragIndex],
        draggableAnswers[payload.hoverIndex],
      ] = [
        draggableAnswers[payload.hoverIndex],
        draggableAnswers[payload.dragIndex],
      ];
    },
  },
  extraReducers: {
    [actionGetTestsSuccess]: (state, { payload }) => {
      state.questions = payload.entities.questions || {};
    },
    [actionCreateAnswerSuccess]: (state, { payload }) => {
      state.questions[payload.questionId].answers.push(payload.answer.id);
    },
    [actionDeleteAnswerSuccess]: (state, { payload }) => {
      state.questions[payload.questionId].answers = state.questions[
        payload.questionId
      ].answers.filter(answer => {
        return answer !== payload.id;
      });
    },
  },
});

export const actions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
