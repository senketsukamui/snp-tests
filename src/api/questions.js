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

export const editQuestion = payload => {
  return request.PATCH({
    url: `/questions/${payload.questionId}`,
    data: {
      ...payload,
    },
  });
};

export const deleteQuestion = questionId => {
  return request.DELETE({
    url: `/questions/${questionId}`,
  });
};

export const swapAnswers = ({ firstId, hoverIndex }) => {
  return request.PATCH({
    url: `/answers/${firstId}/insert_at/${hoverIndex}`,
  });
};
