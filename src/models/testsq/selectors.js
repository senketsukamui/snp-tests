import { createSelector } from 'reselect';

export const testsSelector = createSelector(
  state => state,
  state => state.tests
);

export const testsListSelector = createSelector(
  testsSelector,
  ({ tests }) => tests
);

export const testsListSelectorById = id =>
  createSelector(
    testsSelector,
    ({ tests }) => tests[id]
  );

export const metaSelector = createSelector(
  testsSelector,
  ({ meta }) => meta
);

export const resultSelector = createSelector(
  testsSelector,
  ({ result }) => result
);
