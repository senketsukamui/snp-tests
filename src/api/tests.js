import request from './request';

export const getTests = () => {
  return request.GET({
    url: '/tests',
  });
};

export const createTest = ({ title }) => {
  return request.POST({
    url: '/tests',
    data: {
      title,
    },
  });
};

export const editTest = ({id, title}) => {
  return request.PATCH({
    url: `/tests/${id}`,
    data: {
      title,
    },
  });
};
