import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { answersListSelector } from 'models/answers/selectors';
import Answer from './Answer';

const Question = props => {
  const answers = useSelector(answersListSelector);
  return (
    <div className={styles.question}>
      <div className={styles.title}>
        {props.index + 1}. {props.title}
      </div>
      <div className={styles.answers}>
        {props.question_type === 'number' ? (
          <input />
        ) : (
          props.answers.map(id => <Answer {...answers[id]} />)
        )}
      </div>
    </div>
  );
};

export default Question;
