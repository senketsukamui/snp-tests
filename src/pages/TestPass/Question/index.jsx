import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { answersListSelector } from 'models/answers/selectors';
import Answer from './Answer';

const Question = props => {
  const answers = useSelector(answersListSelector);
  const rightAnswers = props.answers.reduce((acc, value) => {
    if (answers[value].is_right) {
      return [...acc, value];
    }
    return [...acc];
  }, []);

  const radioAnswers = props.answers.reduce((acc, value) => {
    return { ...acc, [value]: false };
  }, {});

  const [currentAnswers, changeCurrentAnswers] = React.useState({});
  const [radioState, changeRadioState] = React.useState(radioAnswers);
  const [numberAnswerState, changeNumberAnswerState] = React.useState('');
  const handleChangeCurrentAnswers = (id, value) => {
    changeCurrentAnswers({ ...currentAnswers, [id]: value });
  };
  const handleRadioStateChange = id => {
    changeRadioState({ ...radioAnswers, [id]: true });
  };
  const handleNumberInputChange = e => {
    changeNumberAnswerState(e.target.value);
  };
  console.log(radioState);
  return (
    <div className={styles.question}>
      <div className={styles.title}>
        {props.index + 1}. {props.title}
      </div>
      <div className={styles.answers}>
        {props.question_type === 'number' ? (
          <input onChange={handleNumberInputChange} value={numberAnswerState} />
        ) : (
          props.answers.map(id => (
            <Answer
              {...answers[id]}
              type={props.question_type}
              numericAnswer={props.answer}
              key={id}
              changeCurrentAnswers={handleChangeCurrentAnswers}
              changeRadio={handleRadioStateChange}
              radioChecked={radioState[id]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Question;
