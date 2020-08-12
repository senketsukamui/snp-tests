import React from 'react';
import { useSelector } from 'react-redux';
import { questionsListSelector } from 'models/questions/selectors';
import Question from './Question';
import PropTypes from 'prop-types';
import styles from './index.scss';
import { actions as questionsActions } from 'models/questions/slice';
import { actions as testsActions } from 'models/testsq/slice';
import useAction from 'hooks/useAction';
import {
  testsListSelectorById,
  testsLoadingSelector,
} from 'models/testsq/selectors';
import { isAdminSelector, isAuthorizedSelector } from 'models/users/selectors';
import { useHistory } from 'react-router-dom';
import Dropdown from 'components/Dropdown';
import edit from 'assets/images/edit.png';
import left from 'assets/images/left.png';
import Loader from 'components/Loader';

const TestWindowContainer = props => {
  const history = useHistory();
  const isAdmin = useSelector(isAdminSelector);
  const isAuthorized = useSelector(isAuthorizedSelector);
  const testsLoading = useSelector(testsLoadingSelector);
  const getTestById = useAction(testsActions.getTestById.type);
  const testById = useSelector(testsListSelectorById(props.match.params.id));
  if (!isAdmin || !isAuthorized) {
    history.push('/auth');
  }
  React.useEffect(() => {
    if (!testById) {
      getTestById({ id: props.match.params.id });
    }
  }, [testById, getTestById, props.match.params.id]);

  if (testsLoading || !testById) {
    return <Loader />;
  }
  return <TestWindow {...props} testsLoading={testsLoading} />;
};

const TestWindow = props => {
  const history = useHistory();
  const questionList = useSelector(questionsListSelector);
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
  const [showTestEdit, changeShowTestEdit] = React.useState(false);
  const [testTitleState, changeTestTitleState] = React.useState(testTitle);
  const [dropdownState, changeDropdownState] = React.useState(answerTypes[0]);
  const [numberAnswerState, changeNumberAnswerState] = React.useState('');

  const handleDropdownChange = React.useCallback(select => {
    changeDropdownState(select);
  }, []);
  const handleQuestionInputChange = React.useCallback(e => {
    changeQuestionState(e.target.value);
  }, []);

  const handleQuestionCreate = React.useCallback(
    e => {
      e.preventDefault();
      onQuestionCreate({
        testId,
        questionTitle: questionState,
        question_type: dropdownState,
        answer: numberAnswerState,
      });
      changeQuestionState('');
      changeNumberAnswerState('');
    },
    [onQuestionCreate, questionState, dropdownState, numberAnswerState, testId]
  );

  const handleTestEdit = React.useCallback(() => {
    onTestTitleEdit({
      id: testId,
      title: testTitleState,
    });
    changeShowTestEdit(false);
  }, [testId, testTitleState, onTestTitleEdit]);

  const handleTestTitleChange = React.useCallback(e => {
    changeTestTitleState(e.target.value);
  }, []);

  const handleNumberAnswerState = React.useCallback(e => {
    changeNumberAnswerState(e.target.value);
  }, []);

  const handleEditTestClick = React.useCallback(() => {
    changeShowTestEdit(!showTestEdit);
  }, [showTestEdit]);

  const handleBackClick = React.useCallback(() => {
    history.push('/');
  }, [history]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.test}>
        <div className={styles.header}>
          <div className={styles.test_edit}>
            <input
              type="text"
              className={styles.test_title}
              value={testTitleState}
              onChange={handleTestTitleChange}
              disabled={!showTestEdit}
            />
            {showTestEdit ? (
              <button onClick={handleTestEdit} className={styles.test_button}>
                Save
              </button>
            ) : (
              <button
                onClick={handleEditTestClick}
                className={styles.test_button}
              >
                <img src={edit} alt="" />
              </button>
            )}
          </div>
        </div>
        <form
          className={styles.question_create}
          onSubmit={handleQuestionCreate}
        >
          <input
            type="text"
            onChange={handleQuestionInputChange}
            value={questionState}
            placeholder="Question title"
            className={styles.question_input}
            required
          />
          {dropdownState === 'number' ? (
            <input
              className={styles.question_input}
              type="text"
              onChange={handleNumberAnswerState}
              value={numberAnswerState}
              placeholder="Enter number"
              required
            />
          ) : (
            ''
          )}
          <Dropdown items={answerTypes} handleChange={handleDropdownChange} />
          <button className={styles.question_createbutton} type="submit">
            Create
          </button>
        </form>
        {renderedQuestions.length ? (
          renderedQuestions
        ) : (
          <div className={styles.no_questions}>No questions here</div>
        )}
      </div>
      <div className={styles.back} onClick={handleBackClick}>
        <img src={left} alt="" />
      </div>
    </div>
  );
};

TestWindowContainer.propTypes = {
  match: PropTypes.any,
};

TestWindowContainer.defaultProps = {
  match: {},
};

TestWindow.propTypes = {
  match: PropTypes.any,
};

TestWindow.defaultProps = {
  match: {},
};

export default React.memo(TestWindowContainer);
