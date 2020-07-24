import React from 'react';
import { useSelector } from 'react-redux';
import { answersListSelector } from '../../../models/answers/selectors';
import Answer from './Answer';

const Question = props => {
  const answersList = useSelector(answersListSelector);

  const renderedAnswers = props.answers.map(answer => (
    <Answer {...answersList[answer]} key={answer} />
  ));
  return (
    <div>
      <div>{props.title}</div>
      <div>
        <h1>Answers</h1>
        <div>{renderedAnswers}</div>
      </div>
    </div>
  );
};

export default Question;
