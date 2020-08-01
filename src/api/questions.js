import request from './request';

export const createQuestion = ({
  testId,
  questionTitle,
  question_type,
  answer,
}) => {
  return request.POST({
    url: `/tests/${testId}/questions`,
    data: {
      title: questionTitle,
      question_type,
      answer: answer || 0,
    },
  });
};

export const deleteQuestion = questionId => {
  return request.DELETE({
    url: `/questions/${questionId}`,
  });
};
