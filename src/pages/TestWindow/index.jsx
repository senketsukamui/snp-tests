import React from 'react';
import { useSelector } from 'react-redux';
import { questionsListSelector } from '../../models/questions/selectors';
import Question from './Question';
import PropTypes from 'prop-types';
import styles from './index.scss';
import add from 'assets/images/plus.png';
import { createQuestion } from 'models/questions/slice';
import useAction from 'hooks/useAction';

const TestWindow = props => {
  const questionIds = props.location.state.questions;
  const testTitle = props.location.state.title;
  const testId = props.match.params.id;
  const questionList = useSelector(questionsListSelector);
  const onQuestionCreate = useAction(createQuestion.type);

  const renderedQuestions = questionIds.map((id, index) => (
    <Question {...questionList[id]} key={id} index={index} />
  ));

  const [showInput, changeShowInputState] = React.useState(false);
  const [questionState, changeQuestionState] = React.useState('');

  const handleQuestionInputChange = e => {
    changeQuestionState(e.target.value);
  };

  const handleCreateInputShow = () => {
    changeShowInputState(!showInput);
  };

  const handleQuestionCreate = () => {
    onQuestionCreate({
      testId: testId,
      questionTitle: questionState,
    });
  };

  const newQuestionInput = (
    <div>
      <div>Question title:</div>
      <input
        type="text"
        onChange={handleQuestionInputChange}
        onBlur={handleCreateInputShow}
      />
      <button onClick={handleQuestionCreate}>Create</button>
    </div>
  );

  return (
    <div className={styles.test}>
      <h1 className={styles.test_title}>{testTitle}</h1>
      {renderedQuestions.length ? (
        renderedQuestions
      ) : (
        <div className={styles.no_questions}>No questions here</div>
      )}
      {showInput ? '' : <button onClick={handleCreateInputShow}>Create</button>}
      {showInput ? newQuestionInput : ''}
    </div>
  );
};

TestWindow.propTypes = {
  location: PropTypes.object,
};

TestWindow.defaultProps = {
  location: {},
};

export default TestWindow;
