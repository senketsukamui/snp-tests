/* eslint-disable no-param-reassign */
import { actions as testsActions } from 'models/testsq/slice';
import { createSlice, createAction } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { constructAction, ACTION_PREFIXES } from '../../utils/constructAction';

const actionGetTestsSuccess = createAction(
  constructAction('getTestsSuccess', ACTION_PREFIXES.testsPrefix)
);

const initialState = {
  answers: {},
};

const answersSlice = createSlice({
  name: 'answersSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [actionGetTestsSuccess]: (state, action) => {
      state.answers = action.payload.answers;
    },
  },
});

export const actions = actionTypes(answersSlice.actions);

export default answersSlice.reducer;
