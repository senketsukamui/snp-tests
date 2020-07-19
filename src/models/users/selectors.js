import { createSelector } from 'reselect';

// import { denormalize } from 'utils/normalizeById';

export const usersSelector = createSelector(
  state => state,
  state => state.users
);

export const isAuthorizedSelector = createSelector(
  usersSelector,
  ({ isAuthorized }) => isAuthorized
);
