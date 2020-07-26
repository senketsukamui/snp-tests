// С этим вряд ли проблемы. У меня всё робировало, пока я не начал делать логику создания вопроса. Оно легло просто не пойми на чём
export const actionTypes = actions => {
  return Object.keys(actions).reduce(
    (acc, key) => ({
      ...acc,
      [key]: actions[key],
    }),
    {}
  );
};
