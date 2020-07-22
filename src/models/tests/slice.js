/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { normalize } from '../../utils/normalizeById';

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
      state.tests = normalize(payload);
    },
    createTest: state => {
      state.testsLoading = true;
    },
    createTestSuccess: (state, { payload }) => {
      state.testsLoading = false;
      state[payload.id] = payload;
    },
  },
});

export const actions = actionTypes(testsSlice.actions);

export const tests = testsSlice;

export default testsSlice.reducer;
