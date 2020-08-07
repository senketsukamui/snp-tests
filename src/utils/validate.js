export const validateQuestion = (questionId, questions, answers) => {
  const ids = questions[questionId].answers;
  const questionType = questions[questionId].question_type;
  const answersList = ids.map(id => answers[id]);
  const trueAnswers = answersList.filter(answer => answer.is_right).length;
  if (questionType === 'single' && trueAnswers !== 1) {
    return false;
  } else if (questionType === 'multiple' && trueAnswers < 2) {
    return false;
  }
  return true;
};

export const validateTest = (questionsIds, questions, answers) => {
  return questionsIds.every(id => validateQuestion(id, questions, answers));
};
