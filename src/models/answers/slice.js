/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';
import { tests } from 'models/tests/slice';

const initialState = {
  answers: {},
};

const answersSlice = createSlice({
  name: 'answersSlice',
  initialState,
  reducers: {},
  extraReducers: {},
});
