import { createSelector } from 'reselect';

export const testsSelector = createSelector(
  state => state,
  state => state.tests
);

export const testsListSelector = createSelector(
  testsSelector,
  ({ tests }) => tests
);
