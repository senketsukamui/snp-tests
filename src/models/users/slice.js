/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { actionTypes } from 'utils/actionTypes';

const initialState = {
  isAuthorized: false,
  loading: true,
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
      state.loading = false;
      state.isAuthorized = true;
      state.isAdmin = payload.isAdmin;
      state.username = payload.username;
    },
    userLogout: state => {
      state.loading = true;
    },
    userLogoutSuccess: state => {
      state.loading = false;
      state.isAdmin = null;
      state.username = '';
      state.isAuthorized = false;
    },
    currentSession: state => {
      state.loading = true;
    },
    currentSessionSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthorized = true;
      state.isAdmin = payload.isAdmin;
      state.username = payload.username;
    },
    currentSessionFailed: state => {
      state.loading = false;
    },
  },
});

export const actions = actionTypes(usersSlice.actions);

export default usersSlice.reducer;
