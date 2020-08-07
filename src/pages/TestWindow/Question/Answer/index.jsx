import React from 'react';
import Checkbox from 'components/Checkbox';
import styles from './index.scss';
import PropTypes from 'prop-types';
import trash from 'assets/images/trash.png';
import useAction from 'hooks/useAction';
import { actions as answersActions } from 'models/answers/slice';
import { useSelector } from 'react-redux';
import { answersLoadingSelector } from 'models/answers/selectors';
import Modal from 'components/Modal';
import { useDrop, useDrag } from 'react-dnd';

const Answer = props => {
  const onAnswerDelete = useAction(answersActions.deleteAnswer.type);
  const [modalState, changeModalState] = React.useState(false);
  const [checkboxState, changeCheckboxState] = React.useState(props.is_right);
  const ref = React.useRef(null);

  const handleDeleteClick = () => {
    onAnswerDelete({
      id: props.id,
      questionId: props.questionId,
    });
  };

  const handleCheckboxChange = () => {
    changeCheckboxState(!checkboxState);
  };

  const toggleModal = () => {
    changeModalState(!modalState);
  };

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
        <div className={styles.text}>{props.text}</div>
      </div>
      <div className={styles.buttons}>
        <button onClick={toggleModal}>
          <img src={trash} alt="" />
        </button>
        {modalState && (
          <Modal>
            <Modal.Header>Delete this answer?</Modal.Header>
            <Modal.Buttons>
              <Modal.Button action={handleDeleteClick}>Yes</Modal.Button>
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
};

Answer.defaultProps = {
  is_right: false,
  text: '',
};

export default Answer;
