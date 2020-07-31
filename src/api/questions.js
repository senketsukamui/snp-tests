import request from './request';

export const createQuestion = ({ testId, questionTitle, question_type }) => {
  return request.POST({
    url: `/tests/${testId}/questions`,
    data: {
      title: questionTitle,
      answer: 1,
      question_type,
    },
  });
};

export const deleteQuestion = questionId => {
  return request.DELETE({
    url: `/questions/${questionId}`,
  });
};
