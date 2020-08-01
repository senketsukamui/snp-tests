import React from 'react';
import { useSelector } from 'react-redux';
import { answersListSelector } from '../../../models/answers/selectors';
import Answer from './Answer';
import styles from './index.scss';
import { actions as questionsActions } from 'models/questions/slice';
import { actions as answersActions } from 'models/answers/slice';
import useAction from 'hooks/useAction';
import PropTypes from 'prop-types';

const Question = props => {
  const answersList = useSelector(answersListSelector);
  const onQuestionDelete = useAction(questionsActions.deleteQuestion.type);
  const onAnswerCreate = useAction(answersActions.createAnswer.type);

  const handleDeleteButtonClick = () => {
    onQuestionDelete({ questionId: props.id, testId: props.testId });
  };

  const [showInput, changeShowInputState] = React.useState(false);
  const [answerState, changeAnswerState] = React.useState('');

  const handleAnswerInputChange = e => {
    changeAnswerState(e.target.value);
  };

  const handleCreateInputShow = () => {
    changeShowInputState(!showInput);
  };

  const handleAnswerCreate = () => {
    onAnswerCreate({
      questionId: props.id,
      answer: answerState,
    });
  };

  const newAnswerInput = (
    <div>
      <div>Answer title:</div>
      <input type="text" onChange={handleAnswerInputChange} />
      <button onClick={handleAnswerCreate}>Create</button>
    </div>
  );

  return (
    <div className={styles.question}>
      <div className={styles.question_header}>
        <div className={styles.title}>{`${props.index + 1}. ${
          props.title
        }`}</div>
        <div className={styles.type}>{props.question_type}</div>
      </div>
      {props.question_type === 'single' ||
      props.question_type === 'multiple' ? (
        <div className={styles.answers}>
          <div className={styles.answers_list}>
            {props.answers.length
              ? props.answers.map(answer => (
                  <Answer
                    {...answersList[answer]}
                    key={answer}
                    questionId={props.id}
                  />
                ))
              : ''}
          </div>
          {showInput ? (
            newAnswerInput
          ) : (
            <button className={styles.create} onClick={handleCreateInputShow}>
              Create new
            </button>
          )}
        </div>
      ) : (
        <div className={styles.number_input}>
          <input type="text" value={props.answer} />
          <button>Save</button>
        </div>
      )}
      <button onClick={handleDeleteButtonClick}>Delete question</button>
    </div>
  );
};

Question.propTypes = {
  id: PropTypes.number,
  testId: PropTypes.number,
  index: PropTypes.number,
  title: PropTypes.string,
  question_type: PropTypes.string,
  answers: PropTypes.array,
  answer: PropTypes.number,
};

Question.defaultProps = {
  id: 1,
  testId: 1,
  index: 1,
  title: 'something went wrong',
  question_type: 'single',
  answers: [],
  answer: 1,
};

export default Question;
