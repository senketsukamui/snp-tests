import { createSelector } from 'reselect';

export const usersSelector = createSelector(
  state => state,
  state => state.users
);

export const isAuthorizedSelector = createSelector(
  usersSelector,
  ({ isAuthorized }) => isAuthorized
);

export const usernameSelector = createSelector(
  usersSelector,
  ({ username }) => username
);

export const isAdminSelector = createSelector(
  usersSelector,
  ({ isAdmin }) => isAdmin
);

export const isLoadingSelector = createSelector(
  usersSelector,
  ({ loading }) => loading
);
