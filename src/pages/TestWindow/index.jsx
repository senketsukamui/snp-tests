import React from 'react';
import { useSelector } from 'react-redux';
import { questionsListSelector } from '../../models/questions/selectors';
import Question from './Question';
import PropTypes from 'prop-types';
import styles from './index.scss';
import { actions as questionsActions } from 'models/questions/slice';
import { actions as testsActions } from 'models/testsq/slice';
import useAction from 'hooks/useAction';
import { testsListSelectorById } from '../../models/testsq/selectors';
import { isAdminSelector } from '../../models/users/selectors';
import { useHistory } from 'react-router-dom';

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

  const renderedQuestions = questionIds.map((id, index) => (
    <Question {...questionList[id]} key={id} index={index} testId={testId} />
  ));

  const [showInput, changeShowInputState] = React.useState(false);
  const [questionState, changeQuestionState] = React.useState('');
  const [testTitleState, changeTestTitleState] = React.useState(testTitle);

  const handleQuestionInputChange = e => {
    changeQuestionState(e.target.value);
  };

  const handleCreateInputShow = () => {
    changeShowInputState(!showInput);
  };

  const handleQuestionCreate = () => {
    onQuestionCreate({
      testId,
      questionTitle: questionState,
    });
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

  const newQuestionInput = (
    <div>
      <div>Question title:</div>
      <input type="text" onChange={handleQuestionInputChange} />
      <button onClick={handleQuestionCreate}>Create</button>
    </div>
  );

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
      {renderedQuestions.length ? (
        renderedQuestions
      ) : (
        <div className={styles.no_questions}>No questions here</div>
      )}
      {showInput ? (
        newQuestionInput
      ) : (
        <button onClick={handleCreateInputShow}>Create</button>
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
