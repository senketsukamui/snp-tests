import request from './request';

export const createQuestion = ({ testId, questionTitle }) => {
  return request.POST({
    url: `/tests/${testId}/questions`,
    data: {
      title: questionTitle,
      question_type: 'single',
      answer: 1,
    },
  });
};

export const deleteQuestion = questionId => {
  return request.DELETE({
    url: `/questions/${questionId}`,
  });
};
