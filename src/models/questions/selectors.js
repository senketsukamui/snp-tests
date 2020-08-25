import { createSelector } from 'reselect';

export const questionsSelector = createSelector(
  state => state,
  state => state.questions
);

export const questionsListSelector = createSelector(
  questionsSelector,
  ({ questions }) => questions
);

export const questionsLoadingSelector = createSelector(
  questionsSelector,
  ({ questionsLoading }) => questionsLoading
);
