/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';

const initialState = {
  tests: [],
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
      state.tests = payload;
    },
    createTest: state => {
      state.testsLoading = true;
    },
    createTestSuccess: (state, { payload }) => {
      state.testsLoading = false;
      state.tests.push(payload);
    },
  },
});

export const actions = actionTypes(testsSlice.actions);

export default testsSlice.reducer;
