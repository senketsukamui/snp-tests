import React from 'react';
import Checkbox from 'components/Checkbox';
import styles from './index.scss';
import PropTypes from 'prop-types';
import trash from 'assets/images/trash.png';
import useAction from 'hooks/useAction';
import { actions as answersActions } from 'models/answers/slice';
import LoadingButton from 'components/LoadingButton';
import { useSelector } from 'react-redux';
import { answersLoadingSelector } from '../../../../models/answers/selectors';
import Modal from 'components/Modal';

const Answer = props => {
  const onAnswerDelete = useAction(answersActions.deleteAnswer.type);
  const isLoading = useSelector(answersLoadingSelector);
  const [modalState, changeModalState] = React.useState(false);

  const handleDeleteClick = () => {
    onAnswerDelete({
      id: props.id,
      questionId: props.questionId,
    });
  };

  const toggleModal = () => {
    changeModalState(!modalState);
  };

  return (
    <div className={styles.answer}>
      <div className={styles.info}>
        <Checkbox
          checked={props.is_right}
          className={styles.answer_checkbox}
          id={props.id}
          text={props.text}
        />
        <div className={styles.text}>{props.text}</div>
      </div>
      <div className={styles.buttons}>
        <button onClick={toggleModal}>
          <img src={trash} alt="" />
        </button>
        {modalState && (
          <Modal toggle={toggleModal} action={handleDeleteClick}>
            <Modal.Header>Delete this answer?</Modal.Header>
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
