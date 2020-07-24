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
