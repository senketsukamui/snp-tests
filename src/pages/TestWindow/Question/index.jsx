import React from 'react';
import { useSelector } from 'react-redux';
import { answersListSelector } from '../../../models/answers/selectors';
import Answer from './Answer';
import styles from './index.scss';


const Question = props => {
  const answersList = useSelector(answersListSelector);
  const renderedAnswers = props.answers.map(answer => (
    <Answer {...answersList[answer]} key={answer} />
  ));
  return (
    <div className={styles.question}>
      <div className={styles.title}>{`${props.index + 1}. ${props.title}`}</div>

      {props.question_type === 'single' ||
      props.question_type === 'multiple' ? (
        <div className={styles.answers}>
          <div className={styles.answers_list}>{renderedAnswers}</div>
          <button className={styles.create}>Create new</button>
        </div>
      ) : (
        <div className={styles.number_input}>
          <input type="text" />
          <button>Save</button>
        </div>
      )}
    </div>
  );
};

export default Question;
