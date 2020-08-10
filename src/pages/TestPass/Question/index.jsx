import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { answersListSelector } from 'models/answers/selectors';
import Answer from './Answer';
import { isEqual, sortBy } from 'lodash';
import PropTypes from 'prop-types';

const Question = props => {
  const answers = useSelector(answersListSelector);

  const radioAnswers = React.useMemo(
    () =>
      props.answers.reduce((acc, value) => {
        return { ...acc, [value]: false };
      }, {}),
    [props.answers]
  );

  const [currentAnswers, changeCurrentAnswers] = React.useState({});
  const [radioState, changeRadioState] = React.useState(radioAnswers);
  const [numberAnswerState, changeNumberAnswerState] = React.useState('');

  const rightAnswers = props.answers.reduce((acc, value) => {
    if (answers[value].is_right) {
      return [...acc, value];
    }
    return [...acc];
  }, []);

  const choiceIds = React.useCallback(object => {
    return Object.keys(object).reduce((acc, value) => {
      if (object[value]) {
        return [...acc, Number(value)];
      }
      return [...acc];
    }, []);
  }, []);

  const compareArrays = React.useCallback((a, b) => {
    return a.length === b.length && isEqual(sortBy(a), sortBy(b));
  }, []);

  const checkCorrectness = React.useCallback(
    ids => {
      if (
        props.question_type === 'single' ||
        props.question_type === 'multiple'
      ) {
        if (compareArrays(choiceIds(ids), rightAnswers)) {
          props.changeCorrectQuestionsState(props.id, true);
        } else {
          props.changeCorrectQuestionsState(props.id, false);
        }
      } else if (props.question_type === 'number') {
        if (ids === props.answer) {
          props.changeCorrectQuestionsState(props.id, true);
        } else {
          props.changeCorrectQuestionsState(props.id, false);
        }
      }
    },
    [choiceIds, compareArrays, props, rightAnswers]
  );

  const handleChangeCurrentAnswers = React.useCallback(
    (id, value) => {
      changeCurrentAnswers({ ...currentAnswers, [id]: value });
      checkCorrectness({ ...currentAnswers, [id]: value });
    },
    [checkCorrectness, currentAnswers]
  );
  const handleRadioStateChange = React.useCallback(
    id => {
      changeRadioState({ ...radioAnswers, [id]: true });
      checkCorrectness({ ...radioAnswers, [id]: true });
    },
    [changeRadioState, checkCorrectness, radioAnswers]
  );

  const handleNumberInputChange = React.useCallback(
    e => {
      changeNumberAnswerState(e.target.value);
      checkCorrectness(e.target.value);
    },
    [changeNumberAnswerState, checkCorrectness]
  );

  return (
    <div className={styles.question}>
      <div className={styles.info}>
        <div className={styles.title}>
          {props.index + 1}. {props.title}
        </div>
        <div className={styles.type}>{props.question_type}</div>
      </div>
      <div className={styles.answers}>
        {props.question_type === 'number' ? (
          <input
            onChange={handleNumberInputChange}
            value={numberAnswerState}
            className={styles.number_input}
          />
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

Question.propTypes = {
  answers: PropTypes.array,
  question_type: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  changeCorrectQuestionsState: PropTypes.func,
  id: PropTypes.number,
  answer: PropTypes.number,
};

Question.defaultProps = {
  answers: [],
  question_type: 'single',
  index: 1,
  title: 'default title',
  changeCorrectQuestionsState: () => {
    console.error('something bad happened');
  },
  id: 1,
  answer: 0,
};

export default React.memo(Question);
