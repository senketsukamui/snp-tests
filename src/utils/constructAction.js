export const ACTION_PREFIXES = {
  testsPrefix: 'testsSlice',
  questionPrefix: 'questionsSlice',
  answersPrefix: 'answersSlice',
  usersPrefix: 'usersSlice',
};

export const constructAction = (action, prefix) => `${prefix}/${action}`;
