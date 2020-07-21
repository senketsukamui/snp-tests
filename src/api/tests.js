import request from './request';

export const getTests = () => {
  return request.GET({
    url: '/tests',
  });
};
