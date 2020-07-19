import request from './request';

export const userLogin = ({ username, password }) => {
  console.log(username, password);
  return request.POST({
    url: '/signin',
    data: {
      username,
      password,
    },
  });
};
