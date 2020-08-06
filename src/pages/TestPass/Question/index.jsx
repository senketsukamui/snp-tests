import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { answersListSelector } from 'models/answers/selectors';
import Answer from './Answer';
import { isEqual, sortBy } from 'lodash';

const Question = props => {
  const answers = useSelector(answersListSelector);

  const radioAnswers = props.answers.reduce((acc, value) => {
    return { ...acc, [value]: false };
  }, {});

  const [currentAnswers, changeCurrentAnswers] = React.useState({});
  const [radioState, changeRadioState] = React.useState(radioAnswers);
  const [numberAnswerState, changeNumberAnswerState] = React.useState('');

  const rightAnswers = props.answers.reduce((acc, value) => {
    if (answers[value].is_right) {
      return [...acc, value];
    }
    return [...acc];
  }, []);

  const choiceIds = object => {
    return Object.keys(object).reduce((acc, value) => {
      if (object[value]) {
        return [...acc, Number(value)];
      }
      return [...acc];
    }, []);
  };

  const compareArrays = (a, b) => {
    return a.length === b.length && isEqual(sortBy(a), sortBy(b));
  };

  const checkCorrectness = answers => {
    if (
      props.question_type === 'single' ||
      props.question_type === 'multiple'
    ) {
      if (compareArrays(choiceIds(answers), rightAnswers)) {
        props.changeCorrectQuestionsState(props.id, true);
      } else {
        props.changeCorrectQuestionsState(props.id, false);
      }
    } else if (props.question_type === 'number') {
      if (answers === props.answer) {
        props.changeCorrectQuestionsState(props.id, true);
      } else {
        props.changeCorrectQuestionsState(props.id, false);
      }
    }
  };

  const handleChangeCurrentAnswers = (id, value) => {
    changeCurrentAnswers({ ...currentAnswers, [id]: value });
    checkCorrectness({ ...currentAnswers, [id]: value });
  };
  const handleRadioStateChange = id => {
    changeRadioState({ ...radioAnswers, [id]: true });
    checkCorrectness({ ...radioAnswers, [id]: true });
  };
  const handleNumberInputChange = e => {
    changeNumberAnswerState(e.target.value);
    console.log(e.target.value);
    checkCorrectness(e.target.value);
  };

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
