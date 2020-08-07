import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import {
  testsListSelectorById,
  testsLoadingSelector,
} from 'models/testsq/selectors';

import { questionsListSelector } from 'models/questions/selectors';
import { isAuthorizedSelector } from 'models/users/selectors';
import Question from './Question';
import Modal from '../../components/Modal';
import { useHistory } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { actions as testsActions } from 'models/testsq/slice';
import Loader from 'components/Loader';

const TestPassContainer = props => {
  const history = useHistory();
  const isAuthorized = useSelector(isAuthorizedSelector);
  if (!isAuthorized) {
    history.push('/auth');
  }

  const testsLoading = useSelector(testsLoadingSelector);
  const testById = useSelector(testsListSelectorById(props.match.params.id));
  const getTestById = useAction(testsActions.getTestById.type);

  React.useEffect(() => {
    if (!testById) {
      getTestById({ id: props.match.params.id });
    }
  }, [testById, getTestById, props.match.params.id]);

  if (testsLoading || !testById) {
    return <Loader />;
  }
  return <TestPass {...props} testsLoading={testsLoading} />;
};

const TestPass = props => {
  const history = useHistory();
  const testInfo = useSelector(testsListSelectorById(props.match.params.id));
  const questions = useSelector(questionsListSelector);
  const correctQuestions = testInfo.questions.reduce((acc, value) => {
    acc[value] = false;
    return acc;
  }, {});
  const [correctQuestionsState, changeCorrectQuestionsState] = React.useState(
    correctQuestions
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCorrectQuestionChange = (id, value) => {
    changeCorrectQuestionsState({ ...correctQuestionsState, [id]: value });
  };

  const handleSubmitTest = () => {
    toggleModal();
  };

  const handleRedirectToMain = () => {
    history.push('/');
  };
  console.log(correctQuestionsState);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{testInfo.title}</h1>
      <div>
        {testInfo.questions.map((qst, index) => (
          <Question
            {...questions[qst]}
            index={index}
            key={questions[qst].id}
            changeCorrectQuestionsState={handleCorrectQuestionChange}
          />
        ))}
        <button className={styles.submit} onClick={handleSubmitTest}>
          Submit test
        </button>
        {modalOpen && (
          <Modal toggle={toggleModal} isResultModal={true}>
            <Modal.Header>Your results for test {props.title}:</Modal.Header>
            <Modal.Content>
              {Object.keys(correctQuestionsState).map((qst, index) => (
                <div className={styles.result}>
                  {index + 1}. {correctQuestionsState[qst] ? 'yes' : 'no'}
                </div>
              ))}
            </Modal.Content>
            <Modal.Buttons>
              <Modal.Button action={handleRedirectToMain}>
                Back to main page
              </Modal.Button>
            </Modal.Buttons>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TestPassContainer;
