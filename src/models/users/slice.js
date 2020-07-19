/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';

const initialState = {
  isAuthorized: false,
  loading: false,
  isAdmin: null,
  username: '',
};

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    userLogin: state => {
      state.loading = true;
    },
    userLoginSuccess: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.isAuthorized = true;
      state.isAdmin = payload.isAdmin;
      state.username = payload.username;
    },
  },
});

export const actions = actionTypes(usersSlice.actions);

export default usersSlice.reducer;
