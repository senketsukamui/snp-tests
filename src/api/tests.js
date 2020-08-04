import request from './request';

export const getTests = ({ page, order, search }) => {
  return request.GET({
    url: `/tests?page=${page}&per=10&sort=${order}&search=${search || ''}`,
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

export const editTest = ({ id, title }) => {
  return request.PATCH({
    url: `/tests/${id}`,
    data: {
      title,
    },
  });
};

export const deleteTest = ({ id }) => {
  return request.DELETE({
    url: `/tests/${id}`,
  });
};
