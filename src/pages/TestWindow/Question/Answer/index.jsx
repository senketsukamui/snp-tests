import React from 'react';
import Checkbox from 'components/Checkbox';
import styles from './index.scss';
import PropTypes from 'prop-types';
import trash from 'assets/images/trash.png';
import useAction from 'hooks/useAction';
import { actions as answersActions } from 'models/answers/slice';

const Answer = props => {
  const onAnswerDelete = useAction(answersActions.deleteAnswer.type);

  const handleDeleteClick = () => {
    onAnswerDelete({
      id: props.id,
      questionId: props.questionId,
    });
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
        <button onClick={handleDeleteClick}>
          <img src={trash} alt="" />
        </button>
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
