export const actionTypes = actions => {
  return Object.keys(actions).reduce(
    (acc, key) => ({
      ...acc,
      [key]: actions[key],
    }),
    {}
  );
};
