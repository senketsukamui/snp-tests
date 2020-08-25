import React from 'react';
import Checkbox from 'components/Checkbox';
import styles from './index.scss';
import PropTypes from 'prop-types';
import trash from 'assets/images/trash.png';
import useAction from 'hooks/useAction';
import { actions as answersActions } from 'models/answers/slice';
import Modal from 'components/Modal';
import { useDrop, useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { answersLoadingSelector } from 'models/answers/selectors';

const Answer = props => {
  const onAnswerDelete = useAction(answersActions.deleteAnswer.type);
  const onAnswerEdit = useAction(answersActions.editAnswer.type);
  const [modalState, changeModalState] = React.useState(false);
  const [checkboxState, changeCheckboxState] = React.useState(props.is_right);
  const [answerState, changeAnswerState] = React.useState(props.text);
  const answersLoading = useSelector(answersLoadingSelector);
  const ref = React.useRef(null);

  const handleDeleteClick = React.useCallback(() => {
    onAnswerDelete({
      id: props.id,
      questionId: props.questionId,
    });
  }, [onAnswerDelete, props.id, props.questionId]);

  const handleAnswerEdit = React.useCallback(() => {
    onAnswerEdit({
      id: props.id,
      text: answerState,
      is_right: props.is_right,
    });
  }, [onAnswerEdit, props.id, answerState, props.is_right]);

  const handleAnswerStateChange = React.useCallback(e => {
    changeAnswerState(e.target.value);
  }, []);

  const handleCheckboxChange = React.useCallback(() => {
    changeCheckboxState(!checkboxState);
  }, [checkboxState]);

  const toggleModal = React.useCallback(() => {
    changeModalState(!modalState);
  }, [modalState]);

  const [, drop] = useDrop({
    accept: props.questionId.toString(),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.swapAnswer(dragIndex, hoverIndex, item.answer);
      /* eslint-disable no-param-reassign */
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: props.questionId.toString(),
      answer: props.id,
      index: props.index,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div className={styles.answer} ref={ref} style={{ opacity }}>
      <div className={styles.info}>
        <Checkbox
          checked={checkboxState}
          className={styles.answer_checkbox}
          id={props.id}
          text={props.text}
          change={handleCheckboxChange}
        />
        <input
          className={styles.text}
          value={answerState}
          onChange={handleAnswerStateChange}
        />
        <button onClick={handleAnswerEdit} className={styles.save}>
          Save
        </button>
      </div>
      <div className={styles.buttons}>
        <button onClick={toggleModal}>
          <img src={trash} alt="" />
        </button>
        {modalState && (
          <Modal toggle={toggleModal}>
            <Modal.Header>Delete this answer?</Modal.Header>
            <Modal.Buttons>
              <Modal.Button action={handleDeleteClick} loading={answersLoading}>
                Yes
              </Modal.Button>
              <Modal.Button action={toggleModal}>No</Modal.Button>
            </Modal.Buttons>
          </Modal>
        )}
      </div>
    </div>
  );
};

Answer.propTypes = {
  is_right: PropTypes.bool,
  text: PropTypes.string,
  id: PropTypes.number,
  questionId: PropTypes.number,
  index: PropTypes.number,
  swapAnswer: PropTypes.func,
};

Answer.defaultProps = {
  is_right: false,
  text: '',
  id: 1,
  questionId: 1,
  index: 1,
  swapAnswer: () => {
    console.error('something bad happened');
  },
};

export default React.memo(Answer);
