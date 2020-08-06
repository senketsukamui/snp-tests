import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { answersListSelector } from 'models/answers/selectors';
import Answer from './Answer';
import { conforms } from 'lodash';

const Question = props => {
  const answers = useSelector(answersListSelector);
  const rightAnswers = props.answers.reduce((acc, value) => {
    if (answers[value].is_right) {
      return [...acc, value];
    }
    return [...acc];
  }, []);
  const [currentAnswers, changeCurrentAnswers] = React.useState({});
  const handleChangeCurrentAnswers = (id, value) => {
    changeCurrentAnswers({ ...currentAnswers, [id]: value });
  };
  console.log(currentAnswers);
  return (
    <div className={styles.question}>
      <div className={styles.title}>
        {props.index + 1}. {props.title}
      </div>
      <div className={styles.answers}>
        {props.question_type === 'number' ? (
          <input />
        ) : (
          props.answers.map(id => (
            <Answer
              {...answers[id]}
              type={props.question_type}
              numericAnswer={props.answer}
              key={id}
              changeCurrentAnswers={handleChangeCurrentAnswers}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Question;
