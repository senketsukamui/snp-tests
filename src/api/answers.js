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
