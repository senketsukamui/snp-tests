import request from './request';

export const userLogin = ({ username, password }) => {
  return request.POST({
    url: '/signin',
    data: {
      username,
      password,
    },
  });
};

export const userLogout = () => {
  return request.DELETE({
    url: '/logout',
  });
};

export const currentSession = () => {
  return request.GET({
    url: '/users/current',
  });
};
