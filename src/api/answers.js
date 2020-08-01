import request from './request';

export const createAnswer = (questionId, title) => {
  return request.POST({
    url: `/questions/${questionId}/answers`,
    data: {
      text: title,
      is_right: false,
    },
  });
};

export const editAnswer = payload => {
  return request.PATCH({
    url: `/answers/${payload.id}`,
    data: {
      ...payload,
    },
  });
};

export const deleteAnswer = ({ id }) => {
  return request.DELETE({
    url: `/answers/${id}`,
  });
};
