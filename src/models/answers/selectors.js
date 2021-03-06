import { createSelector } from 'reselect';

export const answersSelector = createSelector(
  state => state,
  state => state.answers
);

export const answersListSelector = createSelector(
  answersSelector,
  ({ answers }) => answers
);

export const answersLoadingSelector = createSelector(
  answersSelector,
  ({ answersLoading }) => answersLoading
);
