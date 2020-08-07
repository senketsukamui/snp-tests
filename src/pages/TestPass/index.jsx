import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { testsListSelectorById } from 'models/testsq/selectors';
import { questionsListSelector } from 'models/questions/selectors';
import Question from './Question';
import Modal from '../../components/Modal';
import { useHistory } from 'react-router-dom';

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
          <Modal>
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

export default TestPass;
