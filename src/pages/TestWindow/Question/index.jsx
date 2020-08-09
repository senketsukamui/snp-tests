import React from 'react';
import { useSelector } from 'react-redux';
import { answersListSelector } from 'models/answers/selectors';
import { questionsListSelector } from 'models/questions/selectors';
import Answer from './Answer';
import styles from './index.scss';
import { actions as questionsActions } from 'models/questions/slice';
import { actions as answersActions } from 'models/answers/slice';
import useAction from 'hooks/useAction';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import trash from 'assets/images/trash.png';
import plus from 'assets/images/plus.png';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import edit from 'assets/images/edit.png';
import { validateQuestion } from 'utils/validate';

const Question = props => {
  const answersList = useSelector(answersListSelector);
  const questionsList = useSelector(questionsListSelector);
  const onQuestionDelete = useAction(questionsActions.deleteQuestion.type);
  const onAnswerCreate = useAction(answersActions.createAnswer.type);
  const onAnswerMove = useAction(questionsActions.swapAnswers.type);
  const onQuestionEdit = useAction(questionsActions.editQuestion.type);

  const handleDeleteButtonClick = () => {
    onQuestionDelete({ questionId: props.id, testId: props.testId });
  };
  const [showInput, changeShowInputState] = React.useState(false);
  const [answerState, changeAnswerState] = React.useState('');
  const [
    questionValidationState,
    changeQuestionValidationState,
  ] = React.useState(false);
  const [modalState, changeModalState] = React.useState(false);
  const [questionTitleState, changeQuestioneTitleState] = React.useState(
    props.title
  );
  const [showTitleButton, changeShowTitleButton] = React.useState(false);
  React.useEffect(() => {
    changeQuestionValidationState(
      !validateQuestion(props.id, questionsList, answersList)
    );
  }, [props.id, questionsList, answersList]);

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

  const handleQuestionTitleChange = e => {
    changeQuestioneTitleState(e.target.value);
  };

  const handleTitleButtonChange = () => {
    changeShowTitleButton(!showTitleButton);
  };

  const handleQuestionEdit = () => {
    onQuestionEdit({
      title: questionTitleState,
      questionId: props.id,
      question_type: props.question_type,
    });
    handleTitleButtonChange();
  };

  const swapAnswer = (dragIndex, hoverIndex, firstId) => {
    onAnswerMove({
      questionId: props.id,
      dragIndex,
      hoverIndex,
      firstId,
    });
  };

  const toggleModal = () => {
    changeModalState(!modalState);
  };

  const newAnswerInput = (
    <div>
      <input
        type="text"
        onChange={handleAnswerInputChange}
        placeholder="Answer title"
      />
      <button onClick={handleAnswerCreate}>Create</button>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.question}>
        <div className={styles.question_header}>
          <div className={styles.question_info}>
            <div className={styles.index}>{props.index + 1}.</div>
            <input
              className={styles.title}
              value={questionTitleState}
              onChange={handleQuestionTitleChange}
              disabled={!showTitleButton}
            />
          </div>
          <div className={styles.buttons}>
            {!showTitleButton ? (
              <button onClick={handleTitleButtonChange}>
                <img src={edit} alt="" />
              </button>
            ) : (
              <button onClick={handleQuestionEdit} className={styles.save}>
                save
              </button>
            )}
            {questionValidationState ? <div>Error</div> : ''}
            <button onClick={toggleModal}>
              <img src={trash} alt="" />
            </button>
            <div className={styles.type}>{props.question_type}</div>
          </div>
        </div>
        {props.question_type === 'single' ||
        props.question_type === 'multiple' ? (
          <div className={styles.answers}>
            <div className={styles.answers_list}>
              {props.answers.length
                ? props.answers.map((answer, index) => (
                    <Answer
                      {...answersList[answer]}
                      key={answer}
                      questionId={props.id}
                      swapAnswer={swapAnswer}
                      index={index}
                    />
                  ))
                : ''}
            </div>
            {showInput ? (
              newAnswerInput
            ) : (
              <button className={styles.create} onClick={handleCreateInputShow}>
                <img src={plus} alt="" />
              </button>
            )}
          </div>
        ) : (
          <div className={styles.number_input}>
            <input type="text" value={props.answer} />
            <button>Save</button>
          </div>
        )}

        {modalState && (
          <Modal>
            <Modal.Header>Delete this answer?</Modal.Header>
            <Modal.Buttons>
              <Modal.Button action={handleDeleteButtonClick}>Yes</Modal.Button>
              <Modal.Button action={toggleModal}>No</Modal.Button>
            </Modal.Buttons>
          </Modal>
        )}
      </div>
    </DndProvider>
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

export default React.memo(Question);
