import React from 'react';
import { useSelector } from 'react-redux';
import { questionsListSelector } from 'models/questions/selectors';
import Question from './Question';
import PropTypes from 'prop-types';
import styles from './index.scss';
import { actions as questionsActions } from 'models/questions/slice';
import { actions as testsActions } from 'models/testsq/slice';
import useAction from 'hooks/useAction';
import { testsListSelectorById } from 'models/testsq/selectors';
import { isAdminSelector } from 'models/users/selectors';
import { useHistory } from 'react-router-dom';
import Dropdown from 'components/Dropdown';

const TestWindow = props => {
  const history = useHistory();
  const questionList = useSelector(questionsListSelector);
  const isAdmin = useSelector(isAdminSelector);
  if (!isAdmin) {
    history.push('/');
  }
  const testId = props.match.params.id;
  const testById = useSelector(testsListSelectorById(testId));
  const testTitle = testById.title;
  const questionIds = testById.questions;
  const onQuestionCreate = useAction(questionsActions.createQuestion.type);
  const onTestTitleEdit = useAction(testsActions.editTest.type);
  const answerTypes = ['single', 'multiple', 'number'];
  const renderedQuestions = questionIds.map((id, index) => (
    <Question {...questionList[id]} key={id} index={index} testId={testId} />
  ));

  const [questionState, changeQuestionState] = React.useState('');
  const [testTitleState, changeTestTitleState] = React.useState(testTitle);
  const [dropdownState, changeDropdownState] = React.useState(answerTypes[0]);
  const [numberAnswerState, changeNumberAnswerState] = React.useState('');

  const handleDropdownChange = select => {
    changeDropdownState(select);
  };

  const handleQuestionInputChange = e => {
    changeQuestionState(e.target.value);
  };

  const handleQuestionCreate = () => {
    onQuestionCreate({
      testId,
      questionTitle: questionState,
      question_type: dropdownState,
      answer: numberAnswerState,
    });
    changeQuestionState('');
    changeNumberAnswerState('');
  };

  const handleTestEdit = () => {
    onTestTitleEdit({
      id: testId,
      title: testTitleState,
    });
  };

  const handleTestTitleChange = e => {
    changeTestTitleState(e.target.value);
  };

  const handleNumberAnswerState = e => {
    changeNumberAnswerState(e.target.value);
  };

  return (
    <div className={styles.test}>
      <div className={styles.header}>
        <input
          type="text"
          className={styles.test_title}
          value={testTitleState}
          onChange={handleTestTitleChange}
        />
        <button onClick={handleTestEdit} className={styles.test_edit}>
          Edit test
        </button>
      </div>
      <div>
        <div>Question title:</div>
        <input type="text" onChange={handleQuestionInputChange} />
        {dropdownState === 'number' ? (
          <input type="text" onChange={handleNumberAnswerState} />
        ) : (
          ''
        )}
        <button onClick={handleQuestionCreate}>Create</button>
        <Dropdown items={answerTypes} handleChange={handleDropdownChange} />
      </div>
      {renderedQuestions.length ? (
        renderedQuestions
      ) : (
        <div className={styles.no_questions}>No questions here</div>
      )}
    </div>
  );
};

TestWindow.propTypes = {
  match: PropTypes.object,
};

TestWindow.defaultProps = {
  match: {},
};

export default React.memo(TestWindow);
